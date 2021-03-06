const express = require("express");
const router = express.Router();

const locals = require("../models/locals");

router.post("/", async (req, res) => {
  const allLocals = await locals.find();

  res.send(allLocals);
});

module.exports = router;
