const Score = require("../models/Score");

module.exports = {
  addScore: async (req, res, next) => {
    const {
      courseName,
      student_id,
      academicYear,
      type,
      homework,
      attendance,
      hours,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      // participation,
      credit,
    } = req.body;

    const newScore = new Score({
      courseName,
      student_id,
      academicYear,
      type,
      hours,
      credit,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      homework,
      attendance,
      // participation,
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
  //  to find all scores
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
  // To find scores according to the studentId
  getStudentScore: async (req, res, next) => {
    const studentId = req.params.studentID;
    try {
      const scores = await Score.find({
        student_id: studentId,
        displayIt: true,
      });

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
  // To edit the course
  editCourse: async (req, res, next) => {
    try {
      const updatedData = req.body;
      const id = req.params.courseID;

      const course = await Score.findOneAndUpdate(
        { _id: id },
        { $set: updatedData },
        { new: true }
      );

      if (!course) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Course updated successfully" });
    } catch (error) {
      return next(error);
    }
  },
  // To delete the course
  deleteCourse: async (req, res, next) => {
    const id = req.params.courseID;

    try {
      const course = await Score.findOneAndUpdate(
        { _id: id },
        { $set: { displayIt: false } },
        { new: true }
      );

      if (!course) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Course Deleted successfully" });
    } catch (error) {
      return next(error);
    }
  },
};
