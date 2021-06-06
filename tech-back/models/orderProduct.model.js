module.exports = (Sequelize, sequelize) => 
  sequelize.define("orderProduct", {
    count: {
      type: Sequelize.INTEGER,
    }
  })