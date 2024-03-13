const User = require("../models/User");

const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

module.exports = {
  createUser: async (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });

    try {
      await newUser.save();
      res
        .status(201)
        .json({ status: true, message: "User created successfully" });
    } catch (error) {
      return next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      const decryptedPassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      const decryptedString = decryptedPassword.toString(CryptoJs.enc.Utf8);

      if (decryptedString !== req.body.password) {
        return res
          .status(404)
          .json({ status: false, message: "Wrong password" });
      }

      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "21d",
      });

      const user_id = user._id;

      res.status(200).json({
        status: true,
        id: user_id,
        username: user.username,
        token: userToken,
      });
    } catch (error) {
      return next(error);
    }
  },
};
