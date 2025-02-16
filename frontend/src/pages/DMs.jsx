import { useState, useEffect, useRef } from "react";

const DMs = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setConversations([
      { id: 1, name: "Seller A" },
      { id: 2, name: "Seller B" },
      { id: 3, name: "John Doe" },
    ]);
  }, []);

  useEffect(() => {
    if (activeChat) {
      setMessages([
        { sender: "seller", text: "Hey, are you interested?" },
        { sender: "user", text: "Yes! What's the price?" },
      ]);
    }
  }, [activeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[90vh] bg-gray-100 p-3">
      {/* Sidebar (Better Spacing, Box for Each Chat) */}
      <div className="w-1/4 bg-white p-3 border-r shadow-md">
        <h2 className="text-lg font-semibold mb-3">Chats</h2>
        <ul className="space-y-3">
          {conversations.map((chat) => (
            <li
              key={chat.id}
              className={`p-3 rounded-lg cursor-pointer shadow-sm ${
                activeChat?.id === chat.id ? "bg-blue-300" : "bg-gray-200"
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <span className="font-medium">{chat.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col bg-white shadow-md rounded-lg p-3 relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-2 border-b">
              <h2 className="text-md font-semibold">Chat with {activeChat.name}</h2>
            </div>

            {/* Messages Container (More Height, No Overlap) */}
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-2 max-h-[70vh] mb-16"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-2 text-sm max-w-xs rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Field (Fixed at Bottom) */}
            <div className="p-3 border-t flex items-center absolute bottom-0 left-0 w-full bg-white">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-4 text-md">
            Select a chat to start messaging
          </p>
        )}
      </div>
    </div>
  );
};

export default DMs;
