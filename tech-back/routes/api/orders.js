const express = require("express");
const router = express.Router();

// Load order model
const { Order } = require("../../models");

// @route POST api/add
// @description add/save order
// @access Public

router.post("/add", (req, res) => {
  Order.create({    
  login: req.body.login,
  address: req.body.address,
  email: req.body.email,
  product: req.body.product
})
  .then((order) => res.json({ msg: "Order added successfully" }))
  .catch((err) =>
    res.status(400).json({ error: "Unable to add this order" })
  );
});

// @route GET api/orders
// @description Get all orders
// @access Public
router.get("/orders", (req, res) => {
  Order.findAll()
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
        id: req.params.id
      }
    })
    .then((order) => res.json({ mgs: "Order entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such order" }));
});

// @route PUT api/order/:id
// @description Update order
// @access Public
router.put("/order/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body)
    .then((order) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/order/:id
// @description Get single order by id
// @access Public
router.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((err) =>
      res.status(404).json({ noinquiryfound: "No order found" })
    );
});

module.exports = router;
