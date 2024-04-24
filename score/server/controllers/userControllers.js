const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res, next) => {
    const user_id = req.params.id;
    console.log("deleteUser", user_id);

    try {
      await User.findByIdAndDelete({ _id: user_id });

      res
        .status(200)
        .json({ status: true, message: "User deleted successfully" });
    } catch (error) {
      return next(error);
    }
  },

  getUser: (req, res, next) => {
    const user_id = req.params.id;
    console.log("getUser", user_id);

    try {
      const user = User.findById(
        { _id: user_id }
        // { password: 0, _v: 0, createdAt: 0, updatedAt: 0 }
      );

      if (!user) {
        return restart
          .status(401)
          .json({ status: false, message: "User  does not exist" });
      }

      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
};
