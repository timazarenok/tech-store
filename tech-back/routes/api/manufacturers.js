const express = require("express");
const router = express.Router();

const { Manufacturer } = require("../../models");

router.post("/add", (req, res) => {
  Manufacturer.create({
    name: req.body.name,
  })
    .then((manufacturer) => res.json({ msg: "Manufacturer added successfully" }))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this Manufacturer" });
    });
});


router.get("/", (req, res) => {
  Manufacturer.findAll()
    .then((manufacturers) => res.json(manufacturers))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No Manufacturer found" })
    );
});

router.delete("/:id", (req, res) => {
  Manufacturer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((manufacturer) =>
      res.json({
        mgs: "manufacturer entry deleted successfully",
      })
    )
    .catch((err) => res.status(404).json({ error: "No such Manufacturer" }));
});


router.put("/manufacturer/:id/edit", (req, res) => {
  Manufacturer.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  )
    .then((manufacturer) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.get("/:id", (req, res) => {
  Manufacturer.findByPk(req.params.id)
    .then((manufacturer) => res.json(manufacturer))
    .catch((err) =>
      res.status(404).json({ noinqueryfound: "No Manufacturer found" })
    );
});

module.exports = router;
