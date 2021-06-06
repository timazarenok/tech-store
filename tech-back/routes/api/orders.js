const express = require("express");
const router = express.Router();

// Load order model
const { Order, Product } = require("../../models");

// @route POST api/add
// @description add/save order
// @access Public

router.post("/add", (req, res) => {
  Order.create({
    telephone: req.body.telephone,
    address: req.body.address,
    status: req.body.status,
    product: req.body.product,
    deliveryId: req.body.deliveryId,
    userId: req.body.userId
  })
    .then((order) => res.json(order))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this order" })
    );
});

router.post("/orders/:id/add-product/:product_id", (req, res) => {
  return Order.findByPk(req.params.id)
    .then((order) => {
      if (!order) {
        res.json("Order not found!");
        return null;
      }
      Product.findByPk(req.params.product_id).then((product) => {
        if (!product) {
          res.json("Product not found!");
          return null;
        }

        order.addProduct(product, { through: { count: req.body.count } });
        res.json({ msg: `added Product id=${product.id} to Order id=${order.id}` });
        return null;
      });
    })
    .catch((err) => {
      res.json("Error while adding Product to Order: ", err);
    });
})
// @route GET api/orders
// @description Get all orders
// @access Public
router.get("/orders", (req, res) => {
  Order.findAll({
    include: [
      {
        model: Product,
        as: "products",
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "width",
          "height",
          "manufacturerId",
          "colorId",
          "subcategoryId"
        ],
        through: {
          attributes: ["order_id", "product_id", "count"],
        },
      },
    ],
  })
    .then((orders) => res.json(orders))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No orders found" })
    );
});

router.get("/orders/user/:id", (req, res) => {
  Order.findAll({
    where: { userId: req.params.id },
    include: [
      {
        model: Product,
        as: "products",
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "width",
          "height",
          "manufacturerId",
          "colorId",
          "subcategoryId"
        ],
        through: {
          attributes: ["order_id", "product_id", "count"],
        },
      },
    ],
  })
    .then((orders) => res.json(orders))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No orders found" })
    );
});


// @route DELETE api/order/:id
// @description Delete order by id
// @access Public
router.delete("/order/:id", (req, res) => {
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((order) => res.json({ mgs: "Order entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such order" }));
});

// @route PUT api/order/:id
// @description Update order
// @access Public

router.put("/update/:id", (req, res) => {
  Order.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "width",
          "height",
          "manufacturerId",
          "colorId",
          "subcategoryId"
        ],
        through: {
          attributes: ["order_id", "product_id"],
        },
      },
    ],
  })
    .then((order) => {
      if (order) {
        order.update({
          ...order,
          status: req.body.status
        })
          .then(() => res.json({ msg: "Updated successfully" }))
      }
    })
});

// @route GET api/order/:id
// @description Get single order by id
// @access Public
router.get("/order/:id", (req, res) => {
  Order.findById(req.params.id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "width",
          "height",
          "manufacturerId",
          "colorId",
          "subcategoryId"
        ],
        through: {
          attributes: ["order_id", "product_id"],
        },
      },
    ],
  })
    .then((order) => res.json(order))
    .catch((err) => res.status(404).json({ noinquiryfound: "No order found" }));
});

module.exports = router;
