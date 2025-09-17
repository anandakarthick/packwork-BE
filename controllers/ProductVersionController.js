import { v4 as uuidv4 } from "uuid";
import ProductVersions from "../models/ProductVersion.js";

export const createProductVersion = async (req, res) => {
  try {
    const { product_id, version_name, description, company_id, created_by } =
      req.body;

    const latestVersion = await ProductVersions.findOne({
      where: { product_id },
      order: [["version_number", "DESC"]],
    });

    const nextVersionNumber = latestVersion
      ? latestVersion.version_number + 1
      : 1;

    if (nextVersionNumber > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum 3 versions allowed per product",
      });
    }

    const productVersion = await ProductVersions.create({
      id: uuidv4(),
      product_id,
      version_number: nextVersionNumber,
      version_name,
      description,
      company_id,
      created_by,
    });

    return res.status(201).json({
      success: true,
      message: "Product version created successfully",
      data: productVersion,
    });
  } catch (error) {
    console.error("Error creating product version:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product version",
    });
  }
};

export const getAllProductVersions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: versions } = await ProductVersions.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    return res.json({
      success: true,
      data: {
        versions,
        pagination: {
          total: count,
          page,
          pages: Math.ceil(count / limit),
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching product versions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product versions",
    });
  }
};

export const getProductVersionById = async (req, res) => {
  try {
    const { id } = req.params;
    const version = await ProductVersions.findByPk(id);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Product version not found",
      });
    }

    return res.json({
      success: true,
      data: version,
    });
  } catch (error) {
    console.error("Error fetching product version:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product version",
    });
  }
};

export const deleteProductVersion = async (req, res) => {
  try {
    const { id } = req.params;
    const version = await ProductVersions.findByPk(id);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Product version not found",
      });
    }

    await version.destroy();

    return res.json({
      success: true,
      message: "Product version deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product version:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product version",
    });
  }
};
