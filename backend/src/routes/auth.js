const express = require("express");
const controller = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, controller.getMe);
router.post("/login", controller.login);
router.post("/register", controller.register);

module.exports = router;
