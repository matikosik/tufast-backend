const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const users = require("../models/users");
const locals = require("../models/locals");

router.post("/", async (req, res) => {
  if (req.body.local == false) {
    const existingUser = await users.findOne({
      correo: req.body.correo,
    });
    if (existingUser) return res.status(400).send("Usuario ya existe");
    else {
      const user = new users({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        password: req.body.password,
        dni: req.body.dni,
      });

      var tokenData = {
        user: user._id,
      };
      var token = jwt.sign(tokenData, process.env.jwtKey, {
        expiresIn: 60 * 60 * 128, // expires in 128 hours
      });
      res.header("token", token);
      res.send(token);

      await user.save();
    }
  }
  if (req.body.local == true) {
    const existingLocal = await locals.findOne({
      correo: req.body.correo,
    });
    if (existingLocal) return res.status(400).send("Local ya existe");
    else {
      const local = new locals({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        correo: req.body.correo,
        celular: req.body.celular,
        password: req.body.password,
        horarios: req.body.horarios,
      });

      var tokenData = {
        user: local._id,
      };
      var token = jwt.sign(tokenData, process.env.jwtKey, {
        expiresIn: 60 * 60 * 128, // expires in 128 hours
      });
      res.header("token", token);
      res.send(token);

      await local.save();
    }
  }
});

module.exports = router;
