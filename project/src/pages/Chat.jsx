import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import MessageInput from "../pages/MessageInput";
import ChatHeader from "../pages/Chatheader";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
   
  } = useChatStore();

 
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageInput />
      </div>
    );
  }





  return (
    
      <div className = "flex-1 flex flex-col overflow-auto">
        <ChatHeader/>
  
        <p>messages..</p>
  
  
        <MessageInput/>
      </div>
    )
  
 
};

export default ChatContainer;