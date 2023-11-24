const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/Users");

const router = express.Router();

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

router.post("/userLogin", (req, res) => {
  const { password, email } = req.body;

  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json("success");
        } else {
          return res.json("The password is incorrect");
        }
      });
    } else {
      return res.json("User not found");
    }
  });
});

// router.post("/userLogin", (req, res) => {
//   const { password, email } = req.body;

//   UserModel.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, response) => {
//           if (err) {
//             console.error("Error comparing passwords:", err);
//             return res.status(500).json("Internal Server Error");
//           }

//           if (response) {
//             const token = jwt.sign(
//               { email: user.email, role: user.role },
//               "jwt-secret-key",
//               { expiresIn: "1d" }
//             );
//             res.cookie("token", token);
//             return res.json("success");
//           } else {
//             return res.json("The password is incorrect");
//           }
//         });
//       } else {
//         return res.json("User not found");
//       }
//     })
//     .catch((err) => {
//       console.error("Error finding user:", err);
//       return res.status(500).json("Internal Server Error");
//     });
// });

module.exports = router;
