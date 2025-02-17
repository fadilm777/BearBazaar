const express = require("express");
const authMiddleware = require("../middleware/auth");
const controller = require('../controllers/upload');

const router = express.Router();

router.get('/:id', authMiddleware, controller.get);
router.post('/', express.raw({ type: ['image/png', 'image/jpeg'], limit: 10000000 }), authMiddleware, controller.upload);

module.exports = router;
