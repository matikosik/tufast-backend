const { response } = require("express");
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

  var response = new Array();

  for (i = 0; i < result.length; i++) {
    if (result[i].horarios[0][days[dateToAppoinment.getDay()]] == undefined) {
      response.push({
        status: false,
        localInfo: result[i].nombre,
        date: dateToAppoinment,
      });
    } else {
      if (
        fromHourToUniqueMinute(
          result[i].horarios[0][days[dateToAppoinment.getDay()]][0]
        ) < fromHourToUniqueMinute(req.body.hour + ":" + req.body.minute) &&
        fromHourToUniqueMinute(
          result[i].horarios[0][days[dateToAppoinment.getDay()]][1]
        ) > fromHourToUniqueMinute(req.body.hour + ":" + req.body.minute)
      ) {
        response.push({
          status: true,
          local: result[i].nombre,
          date: dateToAppoinment,
        });
      } else {
        response.push({
          status: false,
          local: result[i].nombre,
          date: dateToAppoinment,
        });
      }
    }
  }
  res.send(response);
});

module.exports = router;
