const mongoose = require("mongoose");

const MedicineCatSchema = new mongoose.Schema({
  categoryID: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: String,
  notes: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const MedicineCatModel = mongoose.model("MedicineCategory", MedicineCatSchema);

module.exports = MedicineCatModel;
