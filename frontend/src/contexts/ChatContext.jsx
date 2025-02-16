import { useContext, createContext, useState, useMemo, useEffect } from "react";
import { createConversation, getConversations, getMessages, sendMessage } from "@/backend/chat";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState({});
  const [messages, setMessages] = useState({});
  const [wsCache, setWs] = useState(null);

  useEffect(() => {
    if (wsCache) {
      return;
    }

    const ws = new WebSocket("ws://localhost:3000");
    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ token: localStorage.getItem("token") }));
      ws.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        console.log(data);

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
    setWs(ws);

    getConversations()
      .then((conversations) => {
        setConversations((existing) => {
          const newConversations = {...existing};
          conversations.forEach((conversation) => {
            if (!newConversations[conversation.id]) {
              newConversations[conversation.id] = conversation;
            }

            // this is SLOW -- it's an "N+1 query"
            // It was a small design error. We don't have the time to avoid this...
            getMessages(conversation.id)
              .then((messages) => setMessages((o) => ({ ...o, [conversation.id]: messages })))
          });
          return newConversations;
        });
    });
  });

  const conversationsList = useMemo(() => {
    return Object.values(conversations).map((conversation) => ({
      ...conversation,
      messages: messages[conversation.id] ?? [],
    }));
  });

  const doCreateConversation = async (listingId) => {
    try {
      const id = await createConversation(listingId);
      setConversations((conversations) => ({
        [id]: { id, listingId },
        ...conversations,
      }));
      return id;
    } catch (error) {
      // TODO: handle there
      console.error(error);
    }
  };

  const doSendMessage = async (conversationId, content) => {
    try {
      const id = await sendMessage(conversationId, content);
      setMessages((messages) => ({
        [conversationId]: [
          ...messages[conversationId] ?? [],
          { id, conversationId, content },
        ],
      }));
      return id;
    } catch (error) {
      // TODO: handle there
      console.error(error);
    }
  };

  console.log(conversationsList);

  return (
    <ChatContext.Provider
      value={{
        conversations: conversationsList,
        createConversation: doCreateConversation,
        sendMessage: doSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
