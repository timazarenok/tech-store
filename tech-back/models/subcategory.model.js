module.exports = (Sequelize, sequelize) =>
  sequelize.define("subcategory", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
  });