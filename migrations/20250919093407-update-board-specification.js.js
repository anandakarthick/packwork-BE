/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn("board_specifications", "ups", {
    type: Sequelize.FLOAT,
    allowNull: true,
    comment: "Units Per Sheet value",
  });

  await queryInterface.changeColumn("board_specifications", "joints", {
    type: Sequelize.FLOAT,
    allowNull: true,
    comment: "Joints information",
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("board_specifications", "ups", {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: "Units Per Sheet value",
  });

  await queryInterface.changeColumn("board_specifications", "joints", {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: "Joints information",
  });
  }
};
