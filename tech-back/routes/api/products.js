const express = require("express");
const router = express.Router();


// Load product model
const { Product } = require("../../models");

// @route POST api/add
// @description add/save product
// @access Public
router.post("/add", (req, res) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
  })
    .then((product) => res.json({ msg: "Product added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this product" })
    );
});

// @route GET api/products
// @description Get all products
// @access Public
router.get("/", (req, res) => {
  Product.findAll()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No products found" })
    );
});

// @route DELETE api/property/:id
// @description Delete property by id
// @access Public
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((product) => res.json({ mgs: "product entry deleted successfully", properties: Property.findAll() }))
    .catch((err) => res.status(404).json({ error: "No such product" }));
});

// @route PUT api/product/:id
// @description Update product
// @access Public
router.put("/product/:id/edit", (req, res) => {
  Product.update({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
  }, 
    { where: { id: req.params.id }
  })
    .then((product) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/property/:id
// @description Get single property by id
// @access Public
router.get("/product/:id", (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noinqueryfound: "No product found" })
    );
});

module.exports = router;
