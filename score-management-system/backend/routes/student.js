const router = require("express").Router();
const studentControllers = require("../controllers/studentControllers");
// const verifyTokens = require("../middleware/jwt_token");

router.post("/addStudent", studentControllers.addStudent);
router.put("/editStudent/:id", studentControllers.editStudent);
router.get("/getStudents", studentControllers.getStudents);

module.exports = router;
