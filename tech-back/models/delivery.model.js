module.exports = (Sequelize, sequelize) =>
  sequelize.define("delivery", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
  });