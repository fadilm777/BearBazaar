const express = require("express");
const authMiddleware = require("../middleware/auth");
const controller = require("../controllers/listings");

const router = express.Router();

// router.post('/', authMiddleware, controller.create);
router.post('/', controller.create);


module.exports = router;
