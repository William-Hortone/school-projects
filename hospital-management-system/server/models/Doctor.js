const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  doctorID: String,
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
});

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
