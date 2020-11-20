const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const users = require("../models/users");
const locals = require("../models/locals");

router.post("/", async (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  if (decoded.local == false) {
    const user = await users.findById(decoded.user);
    return res.send(user);
  }

  if (decoded.local == true) {
    const local = await locals.findById(decoded.user);
    res.send(local);
  }
});

module.exports = router;
