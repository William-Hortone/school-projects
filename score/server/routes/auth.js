const router = require("express").Router();
const authController = require("../controllers/authControllers");

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/loginStudent", authController.loginStudent);

module.exports = router;
