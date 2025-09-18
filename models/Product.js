import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Auto-generated product ID",
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name of the product",
    },
    reference_number: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Unique reference number",
    },
    client_reference_code: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Client reference code",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Product description",
    },
    category: {
      type: DataTypes.ENUM(
        "SKU",
        "Raw-materials",
        "Finished-goods",
        "Semi-finished-goods",
        "Returnable"
      ),
      allowNull: false,
      comment: "Product category",
    },
    subcategory: {
      type: DataTypes.ENUM(
        "RSC Box",
        "Die-Cut",
        "Board",
        "Composite",
        "Reels",
        "Corrugation-glue",
        "Pasting-glue",
        "Other",
        "Stitching-wires",
        "Die",
        "Stereo",
        "Corrugated",
        "Pasting"
      ),
      allowNull: true,
    },
    stages: {
      type: DataTypes.ENUM("Corrugated", "Pasting"),
      allowNull: true,
      comment: "Product stages",
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Manufacturer name",
    },
    stock_unit: {
      type: DataTypes.ENUM("Kg", "Litre", "Box", "Board", "Piece", "Meter"),
      allowNull: false,
      defaultValue: "Kg",
    },
    min_stock_level: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: "Minimum stock level",
    },
    reorder_level: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      comment: "Reorder level",
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "Low Stock", "Out of Stock"),
      allowNull: false,
      defaultValue: "Active",
      comment: "Product status",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "Is SKU deleted",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "print version is active",
    },
    company_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      comment: "Company Id",
    },
    created_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      comment: "Created By",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      comment: "Updated By",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

export default Products;
