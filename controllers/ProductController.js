import { v4 as uuidv4 } from "uuid";
import Products from "../models/Product.js";
import ProductVersions from "../models/ProductVersion.js";
import ReelSpecification from "../models/ReelSpecification.js";
import ProductVersionLayerSpecification from "../models/ProductVersionLayerSpecification.js";
import GlueSpecification from "../models/GlueSpecification.js";
import WireSpecification from "../models/WireSpecification.js";
import DieSpecification from "../models/DieSpecification.js";
import ProductDieSpecification from "../models/ProductDieSpecification.js";

const createGlueSpec = async ({
  productVersionId,
  company_id,
  created_by,
  updated_by,
  glue_specifications,
  t,
}) => {
  let glueSpec = null;

  if (glue_specifications) {
    glueSpec = await GlueSpecification.create(
      {
        id: uuidv4(),
        product_version_id: productVersionId,
        company_id,
        created_by,
        updated_by,
        ...glue_specifications,
      },
      { transaction: t }
    );
  }

  return { glueSpec };
};
const createDieSpec = async ({
  productVersionId,
  company_id,
  created_by,
  updated_by,
  die_specifications,
  t,
}) => {
  let dieSpec = null;
  let productDieSpec = null;

  if (die_specifications) {
    dieSpec = await DieSpecification.create(
      {
        id: uuidv4(),
        product_version_id: productVersionId,
        board_length: die_specifications.board_length,
        board_width: die_specifications.board_width,
        impressions: die_specifications.impressions,
        ups: die_specifications.ups,
        company_id,
        created_by,
        updated_by,
      },
      { transaction: t }
    );

    productDieSpec = await ProductDieSpecification.create(
      {
        id: uuidv4(),
        die_id: dieSpec.id,
        product_version_id: productVersionId,
        company_id,
        created_by,
        updated_by,
      },
      { transaction: t }
    );
  }

  return { dieSpec, productDieSpec };
};

export const subcategoryHandlers = {
  Reels: async ({
    productVersionId,
    company_id,
    created_by,
    updated_by,
    t,
    reel_specifications,
    layer_specifications,
    glue_specifications,
  }) => {
    let reelSpec = null;
    let layerSpecs = [];
    let glueSpecs = [];

    if (reel_specifications) {
      reelSpec = await ReelSpecification.create(
        {
          id: uuidv4(),
          product_version_id: productVersionId,
          company_id,
          created_by,
          updated_by,
          ...reel_specifications,
        },
        { transaction: t }
      );
    }

    if (layer_specifications && Array.isArray(layer_specifications)) {
      layerSpecs = await ProductVersionLayerSpecification.bulkCreate(
        layer_specifications.map((layer) => ({
          id: uuidv4(),
          product_version_id: productVersionId,
          company_id,
          created_by,
          updated_by,
          ...layer,
        })),
        { transaction: t, returning: true }
      );
    }
    return { reelSpec, layerSpecs };
  },
  "Corrugation-glue": createGlueSpec,
  "Pasting-glue": createGlueSpec,
  "Stitching-wires": async ({
    productVersionId,
    company_id,
    created_by,
    updated_by,
    t,
    wire_specifications,
  }) => {
    let wireSpec = null;

    if (wire_specifications) {
      wireSpec = await WireSpecification.create(
        {
          id: uuidv4(),
          product_version_id: productVersionId,
          company_id,
          created_by,
          updated_by,
          ...wire_specifications,
        },
        { transaction: t }
      );
    }
    return { wireSpec };
  },
  Die: createDieSpec,
};

function getSubcategorySpecifications(subcategory) {
  switch (subcategory) {
    case "Reels":
      return [
        { model: ReelSpecification, as: "ReelSpecification", required: false },
        {
          model: ProductVersionLayerSpecification,
          as: "LayerSpecifications",
          required: false,
        },
      ];
    case "Corrugation-glue":
    case "Pasting-glue":
      return [
        { model: GlueSpecification, as: "GlueSpecification", required: false },
      ];
    case "Stitching-wires":
      return [
        { model: WireSpecification, as: "WireSpecification", required: false },
      ];
    case "Die":
      return [
        {
          model: ProductDieSpecification,
          as: "ProductDieSpecification",
          required: false,
          include: [
            {
              model: DieSpecification,
              as: "DieSpecification",
              required: false,
            },
          ],
        },
      ];
    default:
      return [];
  }
}

export const createProduct = async (req, res) => {
  const t = await Products.sequelize.transaction();
  try {
    const {
      product_name,
      reference_number,
      client_reference_code,
      description,
      category,
      subcategory,
      stages,
      manufacturer,
      stock_unit,
      min_stock_level,
      reorder_level,
      status,
      company_id,
      created_by,
      reel_specifications,
      layer_specifications,
      glue_specifications,
      wire_specifications,
      die_specifications,
    } = req.body;

    const lastProduct = await Products.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["product_id"],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    let nextNumber = 1;
    if (lastProduct?.product_id) {
      const lastNum = parseInt(lastProduct.product_id.replace("PRO#", ""), 10);
      if (!isNaN(lastNum)) nextNumber = lastNum + 1;
    }

    const formattedProductId = `PRO#${String(nextNumber).padStart(3, "0")}`;
    const productId = uuidv4();

    const product = await Products.create(
      {
        id: productId,
        product_id: formattedProductId,
        product_name,
        reference_number,
        client_reference_code,
        description,
        category,
        subcategory,
        stages,
        manufacturer,
        stock_unit,
        min_stock_level,
        reorder_level,
        status,
        company_id,
        created_by,
      },
      { transaction: t }
    );

    const productVersion = await ProductVersions.create(
      {
        id: uuidv4(),
        product_id: productId,
        version_number: 1,
        version_name: "Version 1",
        description: description || "Initial Version",
        company_id,
        created_by,
      },
      { transaction: t }
    );
    let subcategoryData = null;

    if (subcategoryHandlers[subcategory]) {
      subcategoryData = await subcategoryHandlers[subcategory]({
        productVersionId: productVersion.id,
        company_id,
        created_by,
        updated_by: created_by,
        t,
        reel_specifications,
        layer_specifications,
        glue_specifications,
        wire_specifications,
        die_specifications,
      });
    }

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Product and related data created successfully",
      data: {
        product,
        productVersion,
        subcategory,
        subcategoryData,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Products.findAndCountAll({
      where: { is_deleted: false },
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const productsWithIncludes = await Promise.all(
      products.map(async (product) => {
        return await Products.findOne({
          where: { id: product.id },
          include: [
            {
              model: ProductVersions,
              as: "ProductVersions",
              where: { is_active: true },
              required: false,
              include: getSubcategorySpecifications(product.subcategory),
            },
          ],
        });
      })
    );

    return res.json({
      success: true,
      data: {
        products: productsWithIncludes,
        pagination: {
          total: count,
          page,
          pages: Math.ceil(count / limit),
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const basicProduct = await Products.findOne({
      where: { id, is_deleted: false },
      attributes: ["id", "subcategory"],
    });

    if (!basicProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const product = await Products.findOne({
      where: { id, is_deleted: false },
      include: [
        {
          model: ProductVersions,
          as: "ProductVersions",
          where: { is_active: true },
          required: false,
          include: getSubcategorySpecifications(basicProduct.subcategory),
        },
      ],
    });

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const updateProduct = async (req, res) => {
  const t = await Products.sequelize.transaction();
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id, {
      include: [
        {
          model: ProductVersions,
          as: "ProductVersions",
          include: [
            { model: ReelSpecification, as: "ReelSpecification" },
            {
              model: ProductVersionLayerSpecification,
              as: "LayerSpecifications",
            },
            { model: GlueSpecification, as: "GlueSpecification" },
            { model: WireSpecification, as: "WireSpecification" },
            {
              model: ProductDieSpecification,
              as: "ProductDieSpecification",
              include: [{ model: DieSpecification, as: "DieSpecification" }],
            },
          ],
        },
      ],
      transaction: t,
    });

    if (!product) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const {
      product_name,
      reference_number,
      client_reference_code,
      description,
      category,
      subcategory,
      stages,
      manufacturer,
      stock_unit,
      min_stock_level,
      reorder_level,
      status,
      company_id,
      created_by,
      ProductVersion,
    } = req.body;

    await product.update(
      {
        product_name,
        reference_number,
        client_reference_code,
        description,
        category,
        subcategory,
        stages,
        manufacturer,
        stock_unit,
        min_stock_level,
        reorder_level,
        status,
      },
      { transaction: t }
    );

    if (ProductVersion && Array.isArray(ProductVersion)) {
      for (let versionPayload of ProductVersion) {
        const version = product.ProductVersions.find(
          (v) => v.id === versionPayload.id
        );

        if (version) {
          await version.update(
            {
              version_name: versionPayload.version_name,
              description: versionPayload.description,
            },
            { transaction: t }
          );

          if (versionPayload.ReelSpecification) {
            await version.ReelSpecification?.update(
              {
                reel_width: versionPayload.ReelSpecification.reel_width,
                units: versionPayload.ReelSpecification.units,
              },
              { transaction: t }
            );
          }

          if (
            versionPayload.LayerSpecifications &&
            Array.isArray(versionPayload.LayerSpecifications)
          ) {
            for (let layerPayload of versionPayload.LayerSpecifications) {
              const layer = version.LayerSpecifications.find(
                (l) => l.id === layerPayload.id
              );
              if (layer) {
                await layer.update(
                  {
                    gsm: layerPayload.gsm,
                    bf: layerPayload.bf,
                    color_id: layerPayload.color_id,
                    flute_type: layerPayload.flute_type,
                    weight: layerPayload.weight,
                    bursting_strength: layerPayload.bursting_strength,
                  },
                  { transaction: t }
                );
              }
            }
          }

          if (versionPayload.GlueSpecification) {
            if (version.GlueSpecification) {
              await version.GlueSpecification.update(
                {
                  glue_type: versionPayload.GlueSpecification.glue_type,
                  expriry_date: versionPayload.GlueSpecification.expiry_date,
                },
                { transaction: t }
              );
            }
          }

          if (versionPayload.WireSpecification) {
            if (version.WireSpecification) {
              await version.WireSpecification.update(
                {
                  wire_type: versionPayload.WireSpecification.wire_type,
                },
                { transaction: t }
              );
            }
          }

       
          if (
            versionPayload.ProductDieSpecification &&
            Array.isArray(versionPayload.ProductDieSpecification)
          ) {
            for (let pdsPayload of versionPayload.ProductDieSpecification) {
              const productDieSpec = version.ProductDieSpecification.find(
                (pds) => pds.id === pdsPayload.id
              );

              if (productDieSpec) {
                await productDieSpec.update(
                  {
                    die_id: pdsPayload.die_id || productDieSpec.die_id,
                  },
                  { transaction: t }
                );

                if (
                  productDieSpec.DieSpecification &&
                  pdsPayload.DieSpecification
                ) {
                  await productDieSpec.DieSpecification.update(
                    {
                      board_length: pdsPayload.DieSpecification.board_length,
                      board_width: pdsPayload.DieSpecification.board_width,
                      impressions: pdsPayload.DieSpecification.impressions,
                      ups: pdsPayload.DieSpecification.ups,
                    },
                    { transaction: t }
                  );
                }
              }
            }
          }
        }
      }
    }

    await t.commit();
    return res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const t = await Products.sequelize.transaction();
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id, {
      include: [
        {
          model: ProductVersions,
          as: "ProductVersions",
          include: [
            { model: ReelSpecification, as: "ReelSpecification" },
            {
              model: ProductVersionLayerSpecification,
              as: "LayerSpecifications",
            },
            { model: GlueSpecification, as: "GlueSpecification" },
            { model: WireSpecification, as: "WireSpecification" },
            {
              model: ProductDieSpecification,
              as: "ProductDieSpecification",
              include: [{ model: DieSpecification, as: "DieSpecification" }],
            },
          ],
        },
      ],
      transaction: t,
    });

    if (!product) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.update({ is_deleted: true }, { transaction: t });

    for (const version of product.ProductVersions) {
      await version.update({ is_active: false }, { transaction: t });

      if (version.ReelSpecification) {
        await version.ReelSpecification.update(
          { is_active: false },
          { transaction: t }
        );
      }

      if (
        version.LayerSpecifications &&
        version.LayerSpecifications.length > 0
      ) {
        for (const layer of version.LayerSpecifications) {
          await layer.update({ is_active: false }, { transaction: t });
        }
      }

      if (version.GlueSpecification) {
        await version.GlueSpecification.update(
          { is_active: false },
          { transaction: t }
        );
      }

      if (version.WireSpecification) {
        await version.WireSpecification.update(
          { is_active: false },
          { transaction: t }
        );
      }
      if (
        version.ProductDieSpecification &&
        version.ProductDieSpecification.length > 0
      ) {
        for (const productDieSpec of version.ProductDieSpecification) {
          await productDieSpec.update({ is_active: false }, { transaction: t });

          if (productDieSpec.DieSpecification) {
            await productDieSpec.DieSpecification.update(
              { is_active: false },
              { transaction: t }
            );
          }
        }
      }
    }

    await t.commit();

    return res.json({
      success: true,
      message: "Product, its versions, and specifications deleted successfully",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
