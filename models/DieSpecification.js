import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const DieSpecification = sequelize.define(
  "DieSpecification",
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
    board_length: {
      type: DataTypes.FLOAT,
    },
    board_width: {
      type: DataTypes.FLOAT,
    },
    impressions: {
      type: DataTypes.INTEGER,
    },
    ups: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "die_specifications",
    timestamps: false,
  }
);
ProductVersions.hasOne(DieSpecification, {
  foreignKey: "product_version_id",
  as: "DieSpecification",
});
DieSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});

export default DieSpecification;
