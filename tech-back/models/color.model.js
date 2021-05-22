module.exports = (Sequelize, sequelize) =>
  sequelize.define("color", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
  });