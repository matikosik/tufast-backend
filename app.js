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
app.use("/api/getlocals", require("./routes/getlocals"));
app.use("/api/newAppointment", require("./routes/newAppointment"));

app.listen(3000, () => {
  console.log("Server on port 3000");
});