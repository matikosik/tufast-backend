const express = require("express");
const router = express.Router();

const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
    const updateApponment = await appointment.updateOne(
        { _id: req.body.idTurno },
        {
          $set: {
            status: req.body.newStatus,
          },
        }
      );

  res.send("appointment updated successfully");
});

module.exports = router;
