import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";
import MessageInput from "./Messageinput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

function ChatContainer() {
  const {
    getMessagesByUserId,
    messages,
    selectedUser,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe/unsubscribe logic
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  if (!selectedUser) return null;

  return (
    <div className="flex flex-col h-full w-full bg-slate-900/60">
      {/* --- Header --- */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <ChatHeader />
      </div>

      {/* --- Messages --- */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/20">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2 break-words">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-70 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}
      </div>

      {/* --- ✅ Input Bar (Fixed to Bottom) --- */}
      <div className="sticky bottom-0 w-full bg-slate-800/80 backdrop-blur-md border-t border-slate-700 p-2 sm:p-3 shadow-[0_-2px_8px_rgba(0,0,0,0.4)]">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
