const Sequelize = require("sequelize");
const sequelize = new Sequelize("tech", "newuser", "0", {
  dialect: "mysql",
  host: "localhost"
});

const Order = require("./order.model")(Sequelize, sequelize);
const Product = require("./product.model")(Sequelize, sequelize);
const User = require("./user.model")(Sequelize, sequelize);
const Manufacturer = require("./manufacturer.model")(Sequelize, sequelize);
const Color = require("./color.model")(Sequelize, sequelize);

Manufacturer.hasOne(Product, { onDelete: 'cascade' })
Color.hasOne(Product, { onDelete: 'cascade' })

module.exports.Order = Order;
module.exports.Product = Product;
module.exports.User = User;
module.exports.Manufacturer = Manufacturer;
module.exports.Color = Color;
module.exports.sequelize = sequelize;