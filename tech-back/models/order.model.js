module.exports = (Sequelize, sequelize) =>
  sequelize.define("order", {
    telephone: {
      type: Sequelize.STRING,
      // required: true
    },
    address: {
      type: Sequelize.STRING,
      // required: true
    },
    status: {
      type: Sequelize.BOOLEAN,
      // required: true
    },
  });
