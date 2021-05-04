const Sequelize = require("sequelize");
const sequelize = new Sequelize("tech", "newuser", "0", {
  dialect: "mysql",
  host: "localhost"
});

const Order = require("./order.model")(Sequelize, sequelize);
const Product = require("./product.model")(Sequelize, sequelize);
const User = require("./user.model")(Sequelize, sequelize);

module.exports.Order = Order;
module.exports.Product = Product;
module.exports.User = User;
module.exports.sequelize = sequelize;