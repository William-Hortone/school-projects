const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  supplierID: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  contactName: String,
  address: String,
  phone: String,
  fax: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const SupplierModel = mongoose.model("SupplierInfos", SupplierSchema);

module.exports = SupplierModel;
