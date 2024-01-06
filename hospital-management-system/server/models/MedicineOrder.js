const mongoose = require("mongoose");

const MedicineOrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  admissionID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const MedicineOrderModel = mongoose.model("MedicineOrder", MedicineOrderSchema);

module.exports = MedicineOrderModel;
