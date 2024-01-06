const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true,
  },
  categoryID: {
    type: String,
    required: true,
  },
  productName: String,
  supplierID: String,
  unitPrice: String,
  unitInStock: String,
  reorderLevel: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const MedicineModel = mongoose.model("Medicines", MedicineSchema);

module.exports = MedicineModel;
