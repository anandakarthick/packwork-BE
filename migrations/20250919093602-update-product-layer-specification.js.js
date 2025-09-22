/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn("product_version_layer_specifications", "flute_type", {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "Flute type",
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("product_version_layer_specifications", "flute_type", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Flute type",
    });
  }
};
