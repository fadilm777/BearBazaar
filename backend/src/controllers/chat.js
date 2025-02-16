const service = require('../services/chat');
const controller = require('../utils/controller');

async function getConversations(req, res) {
  const conversations = await service.getConversations(req.session.userId);
  res.send({ conversations });
}

async function createConversation(req, res) {
  const { listingId } = req.body;
  const id = await service.createConversation(req.session.userId, parseInt(listingId));
  res.send({ id });
}

async function getMessages(req, res) {
  const { conversationId } = req.params;
  const messages = await service.getMessages(req.session.userId, parseInt(conversationId));
  res.send({ messages });
}

async function sendMessage(req, res) {
  const { conversationId } = req.params;
  const { content } = req.body;
  const id = await service.sendMessage(req.session.userId, parseInt(conversationId), content);
  res.send({ id });
}

module.exports = {
  getConversations: controller(getConversations),
  createConversation: controller(createConversation),
  getMessages: controller(getMessages),
  sendMessage: controller(sendMessage),
};
