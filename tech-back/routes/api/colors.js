const express = require("express");
const router = express.Router();

const { Color } = require("../../models");

router.post("/add", (req, res) => {
  Color.create({
    name: req.body.name,
  })
    .then((color) => res.json({ msg: "Color added successfully" }))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this color" });
    });
});


router.get("/", (req, res) => {
  Color.findAll()
    .then((colors) => res.json(colors))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No colors found" })
    );
});

router.delete("/:id", (req, res) => {
  Color.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((color) =>
      res.json({
        mgs: "color entry deleted successfully",
        properties: Property.findAll(),
      })
    )
    .catch((err) => res.status(404).json({ error: "No such color" }));
});


router.put("/color/:id/edit", (req, res) => {
  Color.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  )
    .then((color) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.get("/:id", (req, res) => {
  Color.findByPk(req.params.id)
    .then((color) => res.json(color))
    .catch((err) =>
      res.status(404).json({ noinqueryfound: "No color found" })
    );
});

module.exports = router;
