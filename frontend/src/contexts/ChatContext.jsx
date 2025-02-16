const { useState, useEffect } = require("react");

const ChatContext = React.createContext();

export function useChat() {
  return React.useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.send({ token: localStorage.getItem("token") });
    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages((messages) => {
          if (!messages[data.message.id]) {
            messages[data.message.id] = [];
          }
          messages[data.message.id].push(data.message);
          return { ...messages };
        });
        setConversations((conversations) => {

          const newConversations = { ...conversations };
          newConversations[data.conversationId] = newConversations[data.conversationId] || [];
          newConversations[data.conversationId].push(data.message);
          return newConversations;
        });
        const { conversationId, message } = data;
        conversations[conversationId] = conversations[conversationId] || [];
        conversations[conversationId].push(message);
      } else if (data.type === "conversation") {
        setConversations((conversations) => ({
          ...conversations,
          [data.conversation.id]: data.conversation,
        }));
      }
    });
  });

  const conversationsList = useMemo(() => {
    return Object.values(conversations).map((conversation) => ({
      ...conversation,
      messages: messages[conversation.id] ?? [],
    }));
  });

  const createConversation = async (listingId) => {
    try {
      const id = await createConversation(listingId);
      setConversations((conversations) => ({
        [id]: { id, listingId },
        ...conversations,
      }));
    } catch (error) {
      // TODO: handle there
      console.error(error);
    }
  };

  const sendMessage = async (conversationId, content) => {
    try {
      const id = await sendMessage(conversationId, content);
      setMessages((messages) => ({
        [conversationId]: [
          ...messages[conversationId] ?? [],
          { id, conversationId, content },
        ],
      }));
    } catch (error) {
      // TODO: handle there
      console.error(error);
    }
  };

  return (
    <ChatContext.Provider value={{ conversations: conversationsList }}>
      {children}
    </ChatContext.Provider>
  );
}
