const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
module.exports = {
  // To add a student
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
  // To Edit a Student
  editStudent: async (req, res, next) => {
    try {
      const updatedData = req.body;
      const id = req.params.id;
      // const studentId = req.params.id;

      const student = await Student.findOneAndUpdate(
        { _id: id },
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
  // To get all students
  getStudents: async (req, res, next) => {
    try {
      const students = await Student.find({ displayIt: true });

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
  // To get a one student
  getOneStudent: async (req, res, next) => {
    const id = req.params.id;
    try {
      const student = await Student.findOne({ _id: id, displayIt: true });

      if (!student) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res.status(200).json({ status: true, student });
    } catch (error) {
      return next(error);
    }
  },
  // To delete a student
  deleteStudent: async (req, res, next) => {
    const id = req.params.id;

    try {
      const student = await Student.findOneAndUpdate(
        { _id: id },
        { $set: { displayIt: false } },
        { new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ status: true, message: "Student Deleted successfully" });
    } catch (error) {
      return next(error);
    }
  },
};
