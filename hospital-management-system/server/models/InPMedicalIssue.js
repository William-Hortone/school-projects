const mongoose = require("mongoose");

const InPMedicineISchema = new mongoose.Schema({
  admissionID: {
    type: String,
    required: true,
    unique: true,
  },
  patientID: String,
  billNumber: String,
  categoryID: {
    type: String,
    required: true,
  },
  productID: String,
  productName: String,
  unitInStock: String,
  quantity: String,
  ratePerUnit: String,
  discount: String,
  amount: String,
  totalAmount: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const InPMIssueModel = mongoose.model("InPMedicineIssue", InPMedicineISchema);

module.exports = InPMIssueModel;
