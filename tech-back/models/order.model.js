module.exports = (Sequelize, sequelize) => 
  sequelize.define("order", {
    login: {
      type: Sequelize.STRING,
      // required: true
    },
    email: {
      type: Sequelize.STRING,
      // required: true
    },
    address: {
      type: Sequelize.STRING,
      // required: true
    },
    product: {
      type: Sequelize.STRING,
      // required: true
    }
  })