/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('glue_specifications', {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      product_version_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      glue_type: {
        type: Sequelize.ENUM('Starch-based', 'Casein', 'Synthetic'),
        allowNull: true,
        comment: 'Type of glue',
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Expiry date for glue products',
      },
      is_active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: 'Whether this print version is active',
      },
      company_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        comment: 'Company this print version belongs to',
      },
      created_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
        comment: 'Admin who created this print version',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
        comment: 'Admin who updated this print version',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('glue_specifications');
  },
};
