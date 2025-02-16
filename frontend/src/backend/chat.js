import { fetchAPI, parseBody } from "./common";

/**
 * @typedef {Object} Conversation
 * @param {number} id
 * @param {number} listingId
 */

/**
 * @typedef {Object} Message
 * @param {number} id
 * @param {number} userId
 * @param {string} content
 */

/**
 * Get all conversations for the current user
 *
 * @returns {Promise<Conversation[]>} List of conversations
 */
export async function getConversations() {
  const res = await fetchAPI("/chat/conversations", "get");
  const { conversations } = await parseBody(res);
  return conversations;
}

/**
 * Create a new conversation for the given listing.
 *
 * @param {number} listingId Id of the listing
 * @returns {number} Id of the new conversation
 */
export async function createConversation(listingId) {
  const res = await fetchAPI("/chat/conversations", "post", { listingId });
  const { id } = await parseBody(res);
  return id;
}

/**
 * Get all messages for the given conversation.
 *
 * @param {number} conversationId Id of the conversation
 * @returns {Promise<Message[]>} List of messages
 */
export async function getMessages(conversationId) {
  const res = await fetchAPI(`/chat/messages/${conversationId}`, 'get');
  const { messages } = await parseBody(res);
  return messages;
}

/**
 * Send a message to a conversation.
 *
 * @param {number} conversationId Id of the conversation
 * @param {string} content Message content
 * @returns {number} Id of the new message
 */
export async function sendMessage(conversationId, content) {
  const res = await fetchAPI(`/chat/messages/${conversationId}`, 'post', { content });
  const { id } = await parseBody(res);
  return id;
}
