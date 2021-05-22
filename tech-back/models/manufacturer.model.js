module.exports = (Sequelize, sequelize) =>
  sequelize.define("manufacturer", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
  });