const express = require("express");
const router = express.Router();

const locals = require("../models/locals");

router.post("/", async (req, res) => {
  const local = await locals.findById(req.body.idLocal);

  res.send(local);
});

module.exports = router;
