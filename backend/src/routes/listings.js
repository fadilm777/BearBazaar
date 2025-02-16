const express = require("express");
const authMiddleware = require("../middleware/auth");
const controller = require("../controllers/listings");

const router = express.Router();

router.get('/feed', authMiddleware, controller.getFeed);
router.get('/mine', authMiddleware, controller.getMine);
router.get('/details/:id', authMiddleware, controller.getOne);
router.post('/', authMiddleware, controller.create);

module.exports = router;
