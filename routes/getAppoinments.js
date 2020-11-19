const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const appointment = require("../models/appointment");
const users = require("../models/users");

router.post("/", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    var resultado = []
    const appointments = await appointment
      .find({
        idLocal: decoded.user,
      }, {_id: 0})
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {}
      const userInfo = await users.findById(appointments[i].idUser, {_id: 0, __v: 0}).lean();
      for(key in userInfo){
        json[key] = userInfo[key]
      }
      for(key in appointments[i]){
        json[key] = userInfo[key]
      }
      resultado.push(json)
    }
    return res.send(resultado);
  } else if (decoded.local == false) {
    const appointments = await appointment.find({
      idUser: decoded.user,
    });
    return res.send(appointments);
  }
});

module.exports = router;
