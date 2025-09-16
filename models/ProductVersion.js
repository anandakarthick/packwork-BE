import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Products from "./Product.js"; 

const ProductVersions = sequelize.define(
  "ProductVersions",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      comment: "Foreign key to Products table",
      references: {
        model: Products,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    version_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Version number (1, 2, 3 - max 3 versions allowed)",
    },
    version_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name/identifier for this version",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Description of changes in this version",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Whether this print version is active",
    },
    company_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      comment: "Company this print version belongs to",
    },
    created_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      comment: "Admin who created this print version",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      comment: "Admin who updated this print version",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product_versions",
    timestamps: false,
  }
);

Products.hasMany(ProductVersions, { foreignKey: "product_id", sourceKey: "id" });
ProductVersions.belongsTo(Products, { foreignKey: "product_id", targetKey: "id" });

export default ProductVersions;
