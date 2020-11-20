const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const appointment = require("../models/appointment");
const locals = require("../models/locals");
const users = require("../models/users");

router.post("/confirmed", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idLocal: decoded.user,
          status: "confirmed",
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const userInfo = await users
        .findById(appointments[i].idUser, { _id: 0, __v: 0 })
        .lean();
      for (key in userInfo) {
        json[key] = userInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  } else if (decoded.local == false) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idUser: decoded.user,
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const localInfo = await locals
        .findById(appointments[i].idLocal, { _id: 0, __v: 0 })
        .lean();
      for (key in localInfo) {
        json[key] = localInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  }
});
router.post("/pending", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idLocal: decoded.user,
          status: "pending",
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const userInfo = await users
        .findById(appointments[i].idUser, { _id: 0, __v: 0 })
        .lean();
      for (key in userInfo) {
        json[key] = userInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  } else if (decoded.local == false) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idUser: decoded.user,
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const localInfo = await locals
        .findById(appointments[i].idLocal, { _id: 0, __v: 0 })
        .lean();
      for (key in localInfo) {
        json[key] = localInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  }
});
router.post("/old", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);

  if (decoded.local == true) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idLocal: decoded.user,
          status: "old",
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const userInfo = await users
        .findById(appointments[i].idUser, { _id: 0, __v: 0 })
        .lean();
      for (key in userInfo) {
        json[key] = userInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  } else if (decoded.local == false) {
    var resultado = [];
    const appointments = await appointment
      .find(
        {
          idUser: decoded.user,
        },
        { status: 0 }
      )
      .lean();
    for (var i = 0; i < appointments.length; i++) {
      var json = {};
      const localInfo = await locals
        .findById(appointments[i].idLocal, { _id: 0, __v: 0 })
        .lean();
      for (key in localInfo) {
        json[key] = localInfo[key];
      }
      for (key in appointments[i]) {
        json[key] = appointments[i][key];
      }
      resultado.push(json);
    }
    return res.send(resultado);
  }
});

module.exports = router;
