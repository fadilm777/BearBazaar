const db = require('../db');
const { emit } = require('./notify');

async function getConversations(userId) {
  const conversations = await db.conversation.findMany({
    select: {
      id: true,
      members: true,
      createdAt: true,
      listing: true,
    },
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
    select: {
      id: true,
      members: true,
      createdAt: true,
      listing: true,
    },
    data: {
      members: {
        connect: [
          { id: userId },
          { id: listing.sellerId },
        ],
      },
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
    select: {
      id: true,
      content: true,
      userId: true,
      createdAt: true,
      conversationId: true,
    },
    where: {
      conversationId,
      conversation: {
        members: {
          some: { id: userId },
        },
      },
    },
  });

  return messages;
}

async function sendMessage(userId, conversationId, content) {
  const message = await db.message.create({
    select: {
      id: true,
      content: true,
      userId: true,
      createdAt: true,
      conversationId: true,
    },
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
