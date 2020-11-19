const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const appointment = require("../models/appointment");
const users = require("../models/users");

router.post("/", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    const appointments = await appointment
      .find({
        idLocal: decoded.user,
      }, {_id: 0})
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {}
      const userInfo = await users.findById(appointments[i].idUser, {_id: 0, __v: 0}).lean();
      for(key in userInfo){
        console.log(key)
      }
    }
    return res.send(appointments);
  } else if (decoded.local == false) {
    const appointments = await appointment.find({
      idUser: decoded.user,
    });
    return res.send(appointments);
  }
});

module.exports = router;
