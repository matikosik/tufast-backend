const express = require("express");
const router = express.Router();

const users = require("../models/users");
const locals = require("../models/locals");

const jwt = require("jsonwebtoken")

router.post("/", async (req, res) => {
    const decoded = jwt.decode(req.headers.token)
  if (decoded.local == false) {
    const user = await users.findById(decoded.user);
    for (key in req.body) {
      if (req.body[key] === null) {
        req.body[key] = user[key];
      }
    }
    await users.findByIdAndUpdate(decoded.user);
  }
  if (decoded.local == true) {
    const local = await locals.findById(decoded.user);
    for (key in req.body) {
      if (req.body[key] === null) {
        req.body[key] = local[key];
      }
    }
    await users.findByIdAndUpdate();
  }
});

module.exports = router;
