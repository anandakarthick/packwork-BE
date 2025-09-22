/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("board_specifications", {
      id: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      product_version_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      ply: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Ply value",
      },
      units: {
        type: Sequelize.ENUM("mm", "cm", "inch"),
        allowNull: true,
        comment: "Units of measurement",
      },
      box_length: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      box_width: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      box_height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      joints: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deckle_size: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      inner_outer_dimension: {
        type: Sequelize.ENUM("Inner", "Outer"),
        allowNull: false,
      },
      flap_width: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      board_length: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      board_width: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      board_length_cm: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      board_width_cm: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ups: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      board_width_per_up: {
        type: Sequelize.FLOAT,
        defaultValue: 60,
      },
      length_trimming_tolerance: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      width_trimming_tolerance: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      strict_adherence: {
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
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.dropTable("board_specifications");
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_board_specifications_units";');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_board_specifications_inner_outer_dimension";');
}
};
