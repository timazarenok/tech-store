module.exports = (Sequelize, sequelize) => 
  sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      // required: true
    },
    description: {
      type: Sequelize.STRING,
      // required: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      // required: true
    },
    price: {
      type: Sequelize.INTEGER,
      // required: true
    },
  })