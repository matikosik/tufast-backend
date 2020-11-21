const mongoose = require("mongoose");

const localsSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  direccion: {
    type: String,
  },
  correo: {
    type: String,
  },
  celular: {
    type: Number,
  },
  password: {
    type: String,
  },
  horarios: {
    type: Object,
  },
  foto:{
    type: String,
  }
});

module.exports = mongoose.model("locals", localsSchema);
