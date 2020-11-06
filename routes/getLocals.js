const express = require("express");
const router = express.Router();

const locals = require("../models/locals");

function fromHourToUniqueMinute(hour) {
  var splittedHour = hour.split(":");
  var toMinuteInDay = splittedHour[0] * 60 + (splittedHour[1] / 60) * 60;
  return toMinuteInDay;
}

router.post("/", async (req, res) => {
  const fullMatch = new Array();
  const allLocals = await locals.find();

  for (i = 0; i < allLocals.length; i++) {
    if (allLocals[i].horarios[0][req.body.dia] == undefined) {
    } else {
      if (
        fromHourToUniqueMinute(allLocals[i].horarios[0][req.body.dia][0]) <
          fromHourToUniqueMinute(req.body.hora) &&
        fromHourToUniqueMinute(allLocals[i].horarios[0][req.body.dia][1]) >
          fromHourToUniqueMinute(req.body.hora)
      ) {
        fullMatch.push(allLocals[i]);
      }
    }
  }
  res.send(fullMatch);
});

module.exports = router;
