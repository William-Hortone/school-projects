const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  admissionID: {
    type: String,
    required: true,
    unique: true,
  },
  patientID: {
    type: String,
    required: true,
  },
  doctorID: String,
  guardianID: String,
  admissionDate: String,
  admissionTime: String,
  bedID: String,
  bedPlace: String,
  emergency: String,
  bedAvailability: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const AdmissionModel = mongoose.model("AdmissionInfos", AdmissionSchema);

module.exports = AdmissionModel;
