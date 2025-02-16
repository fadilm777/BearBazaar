const db = require('../db');

async function getConversations(userId) {
  const conversations = await db.conversation.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
  });

  return conversations;
}

async function createConversation(userId, listingId) {
  const listing = await db.listing.findUnique({ where: { id: listingId } });

  const conversation = await db.conversation.create({
    data: {
      members: [
        { connect: { id: userId } },
        { connect: { id: listing.sellerId } },
      ],
      listingId,
    },
  });

  const users = [userId, listing.sellerId];
  users.forEach((userId) => {
    emit(userId, {
      type: "conversation",
      conversation,
    });
  });

  return conversation.id;
}

async function getMessages(userId, conversationId) {
  const messages = await db.message.findMany({
    where: {
      conversationId,
      userId,
    },
  });

  return messages;
}

async function sendMessage(userId, conversationId, content) {
  const message = await db.message.create({
    data: {
      userId,
      conversationId,
      content,
    },
  });

  const members = await db.user.findMany({
    select: {
      id: true,
    },
    where: {
      conversations: {
        some: {
          id: conversationId,
        },
      },
    },
  });

  members.forEach((member) => {
    emit(member.id, {
      type: "message",
      message,
    });
  });

  return message.id;
}

module.exports = {
  getConversations,
  createConversation,
  getMessages,
  sendMessage,
};
