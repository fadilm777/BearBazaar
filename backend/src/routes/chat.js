const express = require("express");
const authMiddleware = require("../middleware/auth");
const controller = require('../controllers/chat');

const router = express.Router();

router.get("/conversations/", authMiddleware, controller.getConversations);

router.get("/messages/:conversationId", authMiddleware, controller.getMessages);
router.post("/messages/:conversationId", authMiddleware, controller.sendMessage);

module.exports = router;
