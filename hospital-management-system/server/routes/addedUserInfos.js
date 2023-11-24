const express = require("express");
const ModelAddedUser = require("../models/AddedUserDetails");
const router = express.Router();

//  Create a user
router.post("/usersInfos", (req, res) => {
  ModelAddedUser.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the users
router.get("/getUsersDetails", (req, res) => {
  ModelAddedUser.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  user information
router.put("/editUserDetails/:userId", (req, res) => {
  const id = req.params.userId;
  const updatedData = req.body;

  ModelAddedUser.findOneAndUpdate(
    { userID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

//Delete user
router.put("/deleteUser/:userId", (req, res) => {
  const id = req.params.userId;

  ModelAddedUser.findOneAndUpdate(
    {
      userID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
