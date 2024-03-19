const Score = require("../models/Score");

module.exports = {
  addScore: async (req, res, next) => {
    const { courseName, student_id, academicYear, type, hours, score, credit } =
      req.body;

    const newScore = new Score({
      courseName,
      student_id,
      academicYear,
      type,
      hours,
      score,
      credit,
    });
    try {
      await newScore.save();
      res
        .status(201)
        .json({ status: true, message: "Score added successfully" });
    } catch (error) {
      return next(error);
    }
  },
  getScores: async (req, res, next) => {
    try {
      const scores = await Score.find({ displayIt: true });

      if (!scores) {
        return res
          .status(404)
          .json({ status: false, message: "Score not found" });
      }

      return res.status(200).json({ status: true, scores });
    } catch (error) {
      return next(error);
    }
  },
};
