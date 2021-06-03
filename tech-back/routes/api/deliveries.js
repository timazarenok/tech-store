const express = require("express");
const router = express.Router();

const { Delivery } = require("../../models");

router.post("/add", (req, res) => {
    Delivery.create({
    name: req.body.name,
  })
    .then((delivery) => res.json({ msg: "Delivery added successfully" }))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this Delivery" });
    });
});


router.get("/", (req, res) => {
    Delivery.findAll()
    .then((deliveries) => res.json(deliveries))
    .catch((err) =>
      res.status(404).json({ noinquiriesfound: "No Delivery found" })
    );
});

router.delete("/:id", (req, res) => {
    Delivery.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delivery) =>
      res.json({
        mgs: "delivery entry deleted successfully",
      })
    )
    .catch((err) => res.status(404).json({ error: "No such Delivery" }));
});


router.put("/delivery/:id/edit", (req, res) => {
    Delivery.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  )
    .then((delivery) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.get("/:id", (req, res) => {
    Delivery.findByPk(req.params.id)
    .then((delivery) => res.json(delivery))
    .catch((err) =>
      res.status(404).json({ noinqueryfound: "No Delivery found" })
    );
});

module.exports = router;