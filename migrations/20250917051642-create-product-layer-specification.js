/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_version_layer_specifications", {
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
        comment: "Reference to the master SKU",
      },
      layer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      layer_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gsm: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      flute_type: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      color_id: {
        type: Sequelize.CHAR(36),
        allowNull: true,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      bursting_strength: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: "Whether this print version is active",
      },
      company_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        comment: "Company this print version belongs to",
      },
      created_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
        comment: "Admin who created this print version",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
        comment: "Admin who updated this print version",
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
    await queryInterface.dropTable("product_version_layer_specifications");
  },
};
