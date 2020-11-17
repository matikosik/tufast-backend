const express = require("express");
const router = express.Router();

const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
    dateToAppoinment = new Date(
        req.body.year,
        req.body.month - 1,
        req.body.day,
        req.body.hour - 3,
        req.body.minute
      );

    const updateApponment = await appointment.updateOne(
        { _id: req.body.idTurno },
        {
          $set: {
            status: 'pending',
            date: dateToAppoinment
          },
        }
      );

  res.send("appointment updated successfully");
});

module.exports = router;