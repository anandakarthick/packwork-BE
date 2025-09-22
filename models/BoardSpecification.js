import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ProductVersions from "./ProductVersion.js";

const BoardSpecification = sequelize.define(
  "BoardSpecification",
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
    ply: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Ply value",
    },
    units: {
      type: DataTypes.ENUM("mm", "cm", "inch"),
      allowNull: true,
      comment: "Units of measurement",
    },
    box_length: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Box Length",
    },
    box_width: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Box Width",
    },
    box_height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Box Height",
    },
    joints: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Joints information",
    },
    deckle_size: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Deckle size",
    },
    inner_outer_dimension: {
      type: DataTypes.ENUM("Inner", "Outer"),
      allowNull: false,
      comment: "Inner or Outer dimension",
    },
    flap_width: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Flap width",
    },
    board_length: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Board Length",
    },
    board_width: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Board Width",
    },
    board_length_cm: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Length of board in cm for calculation",
    },
    board_width_cm: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Width of board in cm for calculation",
    },
    ups: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Units Per Sheet value",
    },
    board_width_per_up: {
      type: DataTypes.FLOAT,
      defaultValue: 60,
      comment: "Board width per unit",
    },
    length_trimming_tolerance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Length trimming tolerance",
    },
    width_trimming_tolerance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Width trimming tolerance",
    },
    strict_adherence: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "Strict adherence for all layers",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
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
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "board_specifications",
    timestamps: false,
  }
);

ProductVersions.hasOne(BoardSpecification, {
  foreignKey: "product_version_id",
  as: "BoardSpecification",
});
BoardSpecification.belongsTo(ProductVersions, {
  foreignKey: "product_version_id",
  as: "ProductVersion",
});

export default BoardSpecification;
