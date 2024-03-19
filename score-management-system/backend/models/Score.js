const mongoose = require("mongoose");
const Student = require("./Student");

const ScoreSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  hours: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  displayIt: {
    type: Boolean,
    default: true,
  },
});

// Pre-save hook to set the student_id based on the score_id
// ScoreSchema.pre("save", async function (next) {
//   try {
//     // Find the student corresponding to the student_id in the score
//     const student = await Student.findOne({ _id: this.student_id });

//     // If student found, set the student_id of the score to the student_id of the student
//     if (student) {
//       this.student_id = student._id;
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });
module.exports = mongoose.model("Scores", ScoreSchema);
