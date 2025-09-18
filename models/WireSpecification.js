import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const WireSpecification = sequelize.define(
  "WireSpecification",
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
    wire_type: {
      type: DataTypes.ENUM("Galvanized", "Stainless Steel", "Copper-coated"),
      allowNull: true,
      comment: "Type of wire",
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      comment: "Whether this specification is active",
    },
    company_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wire_specifications",
    timestamps: false,
  }
);

ProductVersions.hasOne(WireSpecification, {
  foreignKey: "product_version_id",
  as: "WireSpecification",
});
WireSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});

export default WireSpecification;
