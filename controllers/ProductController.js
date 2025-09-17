import { v4 as uuidv4 } from "uuid";
import Products from "../models/Product.js";
import ProductVersions from "../models/ProductVersion.js";

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
    } = req.body;

    const lastProduct = await Products.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["product_id"],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    let nextNumber = 1;
    if (lastProduct?.product_id) {
      const lastNum = parseInt(lastProduct.product_id, 10);
      if (!isNaN(lastNum)) nextNumber = lastNum + 1;
    }

    const formattedProductId = String(nextNumber).padStart(3, "0");
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

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Product and first version created successfully",
      data: {
        product,
        productVersion,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Products.findAndCountAll({
      where: { is_deleted: false }, 
      include: [
        {
          model: ProductVersions,
          as: "ProductVersions",
          where: { is_active: true }, 
          required: false, 
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    return res.json({
      success: true,
      data: {
        products,
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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({
      where: { id, is_deleted: false }, 
      include: [
        {
          model: ProductVersions,
          as: "ProductVersions",
          where: { is_active: true },
          required: false,
        },
      ],
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    await product.update(req.body);

    res.json({ success: true, message: "Product updated successfully", data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product.is_deleted = true;
    await product.save();

    await ProductVersions.update(
      { is_active: false },
      { where: { product_id: id } }
    );

    return res.json({
      success: true,
      message: "Product and its versions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

