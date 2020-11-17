const express = require("express");
const router = express.Router();

var jwt = require("jsonwebtoken");

const users = require("../models/users");
const locals = require("../models/locals");

router.post("/", async (req, res) => {
  const user = await users.findOne({
    correo: req.body.correo,
  });
  if (!user) {
    const local = await locals.findOne({
      correo: req.body.correo,
    });
    if (!local) {
      res.status(400).send("No existe un usuario con ese mail");
    } else {
      var passMal = true;
      if (req.body.password == local.password) {
        passMal = false;
      }
      if (passMal == true) return res.status(400).send("Contraseña incorrecta");
      else {
        var tokenData = {
          user: local._id,
          local: true
        };
        var token = jwt.sign(tokenData, process.env.jwtKey, {
          expiresIn: 60 * 60 * 128, // expires in 128 hours
        });
        res.json({"token": token, "local": true});
        res.send();
      }
    }
  } else {
    var passMal = true;
    if (req.body.password == user.password) {
      passMal = false;
    }
    if (passMal == true) return res.status(400).send("Contraseña incorrecta");
    else {
      var tokenData = {
        user: user._id,
        local: false
      };
      var token = jwt.sign(tokenData, process.env.jwtKey, {
        expiresIn: 60 * 60 * 128, // expires in 128 hours
      });
      res.json({"token": token, "local": false});
      res.send();
    }
  }
});

module.exports = router;
