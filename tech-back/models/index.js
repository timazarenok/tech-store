const Sequelize = require("sequelize");
const sequelize = new Sequelize("tech", "root", "tima2002", {
  dialect: "mysql",
  host: "localhost"
});

const Order = require("./order.model")(Sequelize, sequelize);
const Product = require("./product.model")(Sequelize, sequelize);
const User = require("./user.model")(Sequelize, sequelize);
const Manufacturer = require("./manufacturer.model")(Sequelize, sequelize);
const Color = require("./color.model")(Sequelize, sequelize);
const Category = require("./category.model")(Sequelize, sequelize);
const Delivery = require("./delivery.model")(Sequelize, sequelize);

Manufacturer.hasOne(Product, { onDelete: 'cascade' })
Color.hasOne(Product, { onDelete: 'cascade' })
Delivery.hasOne(Order, { onDelete: 'cascade' })
Category.hasOne(Product, { onDelete: 'cascade'})

Order.belongsToMany(Product, {
  through: "order_product",
  as: "products",
  foreignKey: "product_id",
});

Product.belongsToMany(Order, {
  through: "order_product",
  as: "orders",
  foreignKey: "order_id",
});

module.exports.Order = Order;
module.exports.Product = Product;
module.exports.User = User;
module.exports.Manufacturer = Manufacturer;
module.exports.Color = Color;
module.exports.Category = Category;
module.exports.Delivery = Delivery;
module.exports.sequelize = sequelize;