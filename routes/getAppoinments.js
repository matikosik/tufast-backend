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
    });
    var arr = []
    for (var i = 0; i < appointments.length; i++) {
      var json = {}
      const userInfo = await users.findById(appointments[i].idUser).lean();
      json.appointmentInfo = appointments[i]
      json.userInfo = userInfo;
      arr.append(json)      
    }
    res.send(arr);
  } else if (decoded.local == false) {
    const appointments = await appointment.find({
      idUser: decoded.user,
    });
    res.send(appointments);
  }
});

module.exports = router;
