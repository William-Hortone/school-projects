const mongoose = require("mongoose");

const AddedUserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  gender: String,
  address: String,
  email: String,
  telephone: String,
  status: String,
  notes: String,
  userType: String,
  userName: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const ModelAddedUser = mongoose.model("AddedUser", AddedUserSchema);

module.exports = ModelAddedUser;
