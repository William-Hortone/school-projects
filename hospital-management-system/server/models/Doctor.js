const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  doctorID: {
    type: String,
    unique: true,
    required: true,
  },
  doctorFN: String,
  nicNo: String,
  doctorLN: String,
  homePhone: String,
  mobilePhone: String,
  Qualifications: String,
  Specialization: String,
  VisitingCharge: String,
  ChannelingCharge: String,
  basicSalary: String,
  sex: String,
  doctorType: String,
  doctorAddress: String,
  doctorNotes: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
