const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  apellido: {
    type: String,
  },
  correo: {
    type: String,
  },
  password:{
    type: String
  },
  dni:{
    type: Number
  }
});

module.exports = mongoose.model("users", UsersSchema);