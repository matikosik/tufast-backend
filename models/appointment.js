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
  date: {
    type: Date,
  }
});

module.exports = mongoose.model("appointments", appointmentsSchema);
