const router = require("express").Router();
const scoreControllers = require("../controllers/scoreControllers");
// const verifyTokens = require("../middleware/jwt_token");

router.post("/addScore", scoreControllers.addScore);
// router.put("/editStudent/:id", scoreControllers.editStudent);
// router.put("/deleteStudent/:id", scoreControllers.deleteStudent);
router.get("/getScores", scoreControllers.getScores);
router.get("/getStudentScore/:studentID", scoreControllers.getStudentScore);

module.exports = router;
