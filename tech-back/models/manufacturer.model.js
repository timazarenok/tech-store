module.exports = (Sequelize, sequelize) =>
  sequelize.define("manufacturer", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
    country: {
      type: Sequelize.STRING
    },
    importer: {
      type: Sequelize.STRING
    },
    proizvod: {
      type: Sequelize.STRING
    }
  });