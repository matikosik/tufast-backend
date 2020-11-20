const express = require("express");
const router = express.Router();

const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
  try {
    await appointment.findByIdAndDelete(req.body.idTurno);
    res.send("appointment deleted successfully");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
