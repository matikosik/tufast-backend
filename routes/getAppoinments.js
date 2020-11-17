const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    const appointments = await appointment.find({
      idLocal: decoded.user
    });
    if (appointments) {
      res.send(appointments);
    }
    else{
        res.send("No hay turnos pendientes")
    }
  } else if (decoded.local == false) {
    const appointments = await appointment.find({
      idUser: decoded.user
    });
    if (appointments) {
      res.send(appointments);
    }
    else{
        res.send("No hay turnos pendientes")
    }
  }
});

module.exports = router;
