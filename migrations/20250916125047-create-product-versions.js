/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_versions", {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      version_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Version number",
      },
      version_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_versions");
  },
};
