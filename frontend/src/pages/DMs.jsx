import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { useState, useEffect, useRef, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import { getUserProfile } from "@/backend/profile";

const DMs = () => {
  const { user } = useAuth();
  const { conversations, sendMessage } = useChat();

  const [activeConversationId, setActiveConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const activeConversation = useMemo(() => activeConversationId && conversations.find((c) => c.id === activeConversationId), [activeConversationId, conversations]);
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(activeConversationId, newMessage);
    setNewMessage("");
  };

  const [profileInfo, setProfileInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const info = await getUserProfile();
        setProfileInfo(info);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    })();
  }, []);


  return (
    <>
      {activeConversation ? (
        <Routes>
          <Route path={"/" + activeConversation.listing?.seller?.username} element={<UserProfile info={profileInfo} />} />
        </Routes>
      ) : (<></>)}
      < div className="flex h-[90vh] bg-gray-100 p-3">
        {/* Sidebar (Better Spacing) */}
        <div className="w-1/4 bg-white p-3 border-r shadow-md">
          <h2 className="text-lg font-semibold mb-3">Chats</h2>
          <ul className="space-y-3">
            {conversations.map((chat) => (
              // <li
              //   key={chat.id}
              //   className={`p-3 rounded-lg cursor-pointer shadow-sm ${
              //     activeConversationId === chat.id ? "bg-blue-300" : "bg-gray-200"
              //   }`}
              //   onClick={() => setActiveConversationId(chat.id)}
              // >
              //   <span className="font-medium">{chat.listing?.title}</span>
              // </li>
              <li
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer shadow-sm ${activeConversationId === chat.id ? "bg-blue-300" : "bg-gray-200"
                  }`}
                onClick={() => setActiveConversationId(chat.id)}
              >
                <span className="font-medium">{chat.listing?.title}</span>
                <span className="block text-sm text-gray-600">
                  Seller: {chat.listing?.seller?.username || "Unknown"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="w-3/4 flex flex-col bg-white shadow-md rounded-lg p-3 relative">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-2 border-b">
                <h2 className="text-md font-semibold">
                  {activeConversation.listing?.title} -
                  <span className="text-md text-gray-500">
                    (Seller: <a className="hover:bg-grey hover:text-blue" href={"/" + activeConversation.listing?.seller?.username}>{activeConversation.listing?.seller?.username || "Unknown"}</a>)
                  </span>
                </h2>
              </div>

              {/* Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-2 max-h-[70vh]"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 text-sm max-w-xs rounded-lg ${msg.userId === user.id
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300"
                      }`}
                  >
                    {msg.content}
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
      </div >
    </>
  );
};

export default DMs;
