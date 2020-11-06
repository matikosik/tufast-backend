const express = require("express");
const router = express.Router();

var jwt = require("jsonwebtoken");

const users = require("../models/users");

router.post("/", async (req, res) => {
  const user = await users.findOne({
    correo: req.body.correo,
  });
  if (!user) return res.status(400).send("No existe un usuario con ese mail");
  else {
    var passMal = true;
    if (req.body.password == user.password) {
      passMal = false;
    }
    console.log("pepe");
    if (passMal == true) return res.status(400).send("Contraseña incorrecta");
    else {
      var tokenData = {
        user: user._id,
      };
      var token = jwt.sign(tokenData, process.env.jwtKey, {
        expiresIn: 60 * 60 * 128, // expires in 128 hours
      });
      res.header("token", token);
      res.send(token);
    }
  }
});

module.exports = router;
