const User = require("../models/User");
const Student = require("../models/Student");

const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

module.exports = {
  createUser: async (req, res, next) => {
    const { username, email, name, password } = req.body;
    const newUser = new User({
      username,
      email,
      name,
      password: CryptoJs.AES.encrypt(
        password,
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
        role: user.role,
        token: userToken,
      });
    } catch (error) {
      return next(error);
    }
  },
  loginStudent: async (req, res, next) => {
    try {
      const student = await Student.findOne({
        studentNumber: req.body.studentNumber,
      });

      if (!student) {
        return res
          .status(404)
          .json({ status: false, message: "Student not found" });
      }

      if (student.password !== req.body.studentPassword) {
        return res
          .status(401)
          .json({ status: false, message: "Wrong password" });
      }

      // If the passwords match, proceed with authentication
      const studentToken = jwt.sign(
        { id: student._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "21d",
        }
      );

      res.status(200).json({
        status: true,
        id: student._id,
        username: student.name,
        role: student.role,
        token: studentToken,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  },
};
