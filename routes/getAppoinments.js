const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const appointment = require("../models/appointment");
const users = require("../models/users");

router.post("/", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    const appointments = await appointment.find({
      idLocal: decoded.user,
    }).lean();
    for (var i = 0; i < appointments.length; i++) {
      var turno = JSON.stringify(appointments[i])
      const userInfo = await users.findById(appointments[i].idUser).lean();  
      var userInf = JSON.stringify(userInfo)
      const json = turno + userInf
      const respuesta = JSON.parse(json)     
      appointments[i] = respuesta 
    }
    res.send(appointments);
  } else if (decoded.local == false) {
    const appointments = await appointment.find({
      idUser: decoded.user,
    });
    res.send(appointments);
  }
});

module.exports = router;
