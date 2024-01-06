const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema({
  supplierID: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: String,
  contactName: String,
  productID: {
    type: String,
    required: true,
  },
  productName: String,
  unitInStock: String,
  unitPurchased: String,
  ratePerUnit: String,
  discount: String,
  amount: String,
  netAmount: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const PurchaseOrderModel = mongoose.model("PurchaseOrder", PurchaseOrderSchema);

module.exports = PurchaseOrderModel;
