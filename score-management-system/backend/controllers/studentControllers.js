const Student = require("../models/Student");

module.exports = {
  addStudent: async (req, res, next) => {
    const { studentNumber, name, major, dOB, gender, schoolingYears } =
      req.body;

    const newStudent = new Student({
      studentNumber,
      name,
      major,
      dOB,
      gender,
      schoolingYears,
    });
    try {
      await newStudent.save();
      res
        .status(201)
        .json({ status: true, message: "Student added successfully" });
    } catch (error) {
      return next(error);
    }
  },
  editStudent: async (req, res, next) => {
    try {
      const updatedData = req.body;
      const studentId = req.params.id;

      const student = await Student.findOneAndUpdate(
        { _id: studentId },
        { $set: updatedData },
        { new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Student updated successfully" });
    } catch (error) {
      return next(error);
    }
  },
  getStudents: async (req, res, next) => {
    try {
      const students = await Student.find();

      if (!students) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res.status(200).json({ status: true, students });
    } catch (error) {
      return next(error);
    }
  },
};
