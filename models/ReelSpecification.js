import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const ReelSpecification = sequelize.define(
  "ReelSpecification",
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
    reel_width: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    units: { 
        type: DataTypes.ENUM("mm", "cm", "inch"), 
        allowNull: false 
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    company_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    created_by: { 
        type: DataTypes.CHAR(36), 
        allowNull: false 
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: { 
        type: DataTypes.CHAR(36), 
        allowNull: false 
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "reel_specifications",
    timestamps: false,
  }
);
ProductVersions.hasOne(ReelSpecification, {
  foreignKey: "product_version_id",
  as: "ReelSpecification",
});
ReelSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});


export default ReelSpecification;
