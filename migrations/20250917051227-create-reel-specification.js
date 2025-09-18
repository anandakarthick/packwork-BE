/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reel_specifications", {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      product_version_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: "product_versions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reel_width: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      units: {
        type: Sequelize.ENUM("mm", "cm", "inch"),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
      },
      company_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_by: {
        type: Sequelize.CHAR(36),
        allowNull: false,
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
    await queryInterface.dropTable("reel_specifications");
  },
};
