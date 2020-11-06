const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
  idLocal: {
    type: String,
  },
  idUser: {
    type: String,
  },
  status: {
    type: String,
  },
  fecha: {
    type: Date,
  }
});

module.exports = mongoose.model("appointments", appointmentsSchema);
