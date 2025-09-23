import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const ProductVersionLayerSpecification = sequelize.define(
  "ProductVersionLayerSpecification",
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    product_version_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      comment: "Reference to the master SKU",
    },
    layer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    layer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gsm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bf: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flute_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bursting_strength: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
    tableName: "product_version_layer_specifications",
    timestamps: false,
  }
);

ProductVersions.hasMany(ProductVersionLayerSpecification, {
  foreignKey: "product_version_id",
  as: "LayerSpecifications",
});
ProductVersionLayerSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});

export default ProductVersionLayerSpecification;
