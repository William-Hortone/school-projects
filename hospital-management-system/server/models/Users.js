const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "visitor",
  },
});

const UserModel = mongoose.model("Users", UsersSchema);

module.exports = UserModel;
