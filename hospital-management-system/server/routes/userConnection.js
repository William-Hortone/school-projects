const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/Users");

const router = express.Router();

// register user
router.post("/userRegister", (req, res) => {
  const { email, name, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ email, name, password: hash })
        .then((user) => res.json("success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

// Login user
router.post("/userLogin", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Generate token
          const token = jwt.sign(
            { email: user.email, role: user.role, userId: user._id },
            "jwt-secret-key",
            {
              expiresIn: "1d",
            }
          );

          // Set the cookie
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: false,
            sameSite: "Lax",
          });
          res.json({
            success: true,
            token,
            user: {
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      });
    })
    .catch((err) => res.json(err));
});

// Logout user
router.post("/userLogout", (req, res) => {
  // Clear the token on
  res.clearCookie("token", { httpOnly: true });

  res.json({ success: true, message: "Logout successful" });
});

module.exports = router;
