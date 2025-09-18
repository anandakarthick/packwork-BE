import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import DieSpecification from "./DieSpecification.js";
import ProductVersions from "./ProductVersion.js";

const ProductDieSpecification = sequelize.define(
  "ProductDieSpecification",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    die_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    product_version_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    company_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.CHAR(36),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.CHAR(36),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product_die_specifications",
    timestamps: false, 
  }
);

DieSpecification.hasMany(ProductDieSpecification, {
  foreignKey: "die_id",
  as: "ProductDieSpecification",
});

ProductDieSpecification.belongsTo(DieSpecification, {
  foreignKey: "die_id",
  as: "DieSpecification",
});

ProductVersions.hasMany(ProductDieSpecification, {
  foreignKey: "product_version_id",
  as: "ProductDieSpecification",
});

ProductDieSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});

export default ProductDieSpecification;
