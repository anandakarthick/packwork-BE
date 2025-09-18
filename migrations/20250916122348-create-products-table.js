/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Auto-generated product ID",
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Name of the product",
      },
      reference_number: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Unique reference number",
      },
      client_reference_code: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Client reference code",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Product description",
      },
      category: {
        type: Sequelize.ENUM(
          "SKU",
          "Raw-materials",
          "Finished-goods",
          "Semi-finished-goods",
          "Returnable"
        ),
        allowNull: false,
      },
      subcategory: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM("Corrugated", "Pasting"),
        allowNull: true,
        comment: "Product stages",
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stock_unit: {
        type: Sequelize.ENUM("Kg", "Litre", "Box", "Board", "Piece", "Meter"),
        allowNull: false,
        defaultValue: "Kg",
      },
      min_stock_level: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      reorder_level: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive", "Low Stock", "Out of Stock"),
        allowNull: false,
        defaultValue: "Active",
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      company_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
