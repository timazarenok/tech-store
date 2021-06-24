const Sequelize = require("sequelize");
const sequelize = new Sequelize("tech", "sammy", "tima2002", {
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
const Subcategory = require("./subcategory.model")(Sequelize, sequelize);
const OrderProduct = require("./orderProduct.model")(Sequelize, sequelize);

Manufacturer.hasOne(Product, { onDelete: 'cascade' })
Color.hasOne(Product, { onDelete: 'cascade' })
Delivery.hasOne(Order, { onDelete: 'cascade' })
Subcategory.hasOne(Product, { onDelete: 'cascade' })
Category.hasOne(Subcategory, { onDelete: 'cascade' })
User.hasMany(Order, { onDelete: 'cascade' })

Order.belongsToMany(Product, {
  through: OrderProduct,
  as: "products",
  foreignKey: "product_id",
  onDelete: 'cascade'
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  as: "orders",
  foreignKey: "order_id",
  onDelete: 'cascade'
});

module.exports.Order = Order;
module.exports.Product = Product;
module.exports.User = User;
module.exports.Manufacturer = Manufacturer;
module.exports.Color = Color;
module.exports.Category = Category;
module.exports.Subcategory = Subcategory;
module.exports.Delivery = Delivery;
module.exports.OrderProduct = OrderProduct;
module.exports.sequelize = sequelize;
