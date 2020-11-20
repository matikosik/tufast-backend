const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

//Conectar a la DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB conection success");
  })
  .catch((err) => console.log(err));

//MiddleWare
app.use(cors());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/getlocals", require("./routes/getLocals"));
app.use("/api/getlocal", require("./routes/getLocal"));
app.use("/api/availability", require("./routes/availability"));
app.use("/api/newAppointment", require("./routes/newAppointment"));
app.use("/api/getAppoinments", require("./routes/getAppoinments"));
app.use("/api/updateAppoinment", require("./routes/updateAppoinment"));
app.use("/api/modifyAppoinment", require("./routes/modifyAppoinment"));
app.use("/api/deleteAppointment", require("/routes/deleteAppointment"))

app.listen(3000, () => {
  console.log("Server on port 3000");
});

const makeOld = require("./routes/makeAppoinmentsOld")

setInterval(function() {
  var date = new Date();
  if ( date.getSeconds() === 0 ) {
    makeOld.makeOld()
  }
}, 1000);