import { useChat } from "@/contexts/ChatContext";
import { useState, useEffect, useRef, useMemo } from "react";

const DMs = () => {
  const { conversations, sendMessage } = useChat();

  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null);

  const activeConversation = useMemo(() => (
    conversations.find((chat) => chat.id === activeConversationId)
  ), [activeConversationId, conversations]);
  const messages = activeConversation?.messages ?? [];

  // Auto-scroll chat window to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await sendMessage(activeConversationId, newMessage);
    } catch (err) {
      setError("Failed to send message.");
    }
  };

  return (
    <div className="flex bg-gray-100" style={{ height: '80vh' }}>
      {/* Sidebar with Conversations */}
      <div className="w-1/4 bg-white p-4 border-r shadow-md">
        <h2 className="text-lg font-semibold mb-3">Chats</h2>
        <ul>
          {conversations.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 mb-2 rounded-lg cursor-pointer ${
                activeConversationId === chat.id ? "bg-blue-300" : "bg-gray-200"
              }`}
              onClick={() => setActiveConversationId(chat)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col bg-white shadow-md rounded-lg p-4">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <h2 className="text-lg font-semibold">Chat with {activeConversation.name}</h2>
            </div>

            {/* Messages Container */}
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 max-w-xs rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-3 border-t flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-10">Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default DMs;
