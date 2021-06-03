module.exports = (Sequelize, sequelize) =>
  sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
  });