import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const GlueSpecification = sequelize.define(
  "GlueSpecification",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    product_version_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    glue_type: {
      type: DataTypes.ENUM("Starch-based", "Casein", "Synthetic"),
      allowNull: true,
      comment: "Type of glue",
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Expiry date for glue products",
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
    tableName: "glue_specifications",
    timestamps: false,
  }
);

ProductVersions.hasOne(GlueSpecification, {
  foreignKey: "product_version_id",
  as: "GlueSpecification",
});
GlueSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});


export default GlueSpecification;
