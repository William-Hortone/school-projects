const mongoose = require("mongoose");

const AddDocAppSchema = new mongoose.Schema({
  patientID: String,
  doctorID: String,
  appointmentDate: String,
  appointmentTime: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const AddDOcAppModel = mongoose.model("AddDocAppointments", AddDocAppSchema);

module.exports = AddDOcAppModel;
