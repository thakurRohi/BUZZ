import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-900">
        <ChatHeader />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-screen flex-1 flex flex-col overflow-hidden bg-gray-200">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end space-x-2 max-w-xs">
              {message.senderId !== authUser._id && (
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div>
                <div className={`p-3 rounded-lg shadow ${message.senderId === authUser._id ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-100"}`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                <time className="text-xs text-gray-400 mt-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              {message.senderId === authUser._id && (
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Dummy element for auto-scroll */}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
