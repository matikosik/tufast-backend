const express = require("express");
const router = express.Router();

const appoinments = require("../models/appointment");
const locals = require("../models/locals");

function fromHourToUniqueMinute(hour) {
  var splittedHour = hour.split(":");
  var toMinuteInDay = splittedHour[0] * 60 + (splittedHour[1] / 60) * 60;
  return toMinuteInDay;
}

router.post("/", async (req, res) => {
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  const result = await locals.find({
    nombre: new RegExp(req.body.search, "i"),
  });
  dateToAppoinment = new Date(
    req.body.year,
    req.body.month - 1,
    req.body.day,
    req.body.hour - 3,
    req.body.minute
  );

  if (result[0].horarios[0][days[dateToAppoinment.getDay()]] == undefined) {
    res.send("El " + result[0].nombre + " NO esta disponible");
  } else {
    if (
      fromHourToUniqueMinute(
        result[0].horarios[0][days[dateToAppoinment.getDay()]][0]
      ) < fromHourToUniqueMinute(req.body.hour + ":" + req.body.minute) &&
      fromHourToUniqueMinute(
        result[0].horarios[0][days[dateToAppoinment.getDay()]][1]
      ) > fromHourToUniqueMinute(req.body.hour + ":" + req.body.minute)
    ) {
      res.send("El " + result[0].nombre + " esta disponible");
    } else {
      res.send("El " + result[0].nombre + " NO esta disponible");
    }
  }
});

module.exports = router;
