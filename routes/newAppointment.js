const express = require("express");
const router = express.Router();

var jwt = require("jsonwebtoken");

const locals = require("../models/locals");
const users = require("../models/users");
const appointment = require("../models/appointment");

router.post("/", async (req, res) => {
    
});

module.exports = router;
