const express = require("express");
const router = express.Router();

const { Category } = require("../../models");

router.post("/add", (req, res) => {
  Category.create({
    name: req.body.name,
  })
    .then((category) => res.json({ msg: "Category added successfully" }))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this Category" });
    });
});


router.get("/", (req, res) => {
  Category.findAll()
    .then((categories) => res.json(categories))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No Categories found" })
    );
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) =>
      res.json({
        mgs: "Category entry deleted successfully",
      })
    )
    .catch((err) => res.status(404).json({ error: "No such category" }));
});


router.put("/category/:id/edit", (req, res) => {
  Category.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  )
    .then((category) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((category) => res.json(category))
    .catch((err) =>
      res.status(404).json({ noinqueryfound: "No Category found" })
    );
});

module.exports = router;
