const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const verifyTokens = require("../middleware/jwt_token");

router.delete("/deleteUser/:id", userControllers.deleteUser);
router.get("/getUser/:id", userControllers.getUser);

module.exports = router;
