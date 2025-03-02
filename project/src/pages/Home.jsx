import { useState } from 'react';
import { FiUser, FiMessageSquare, FiSettings, FiHome, FiSearch, FiHeart, FiCompass } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Chat from './Chat';
import { useChatStore } from './../store/useChatStore';
import NoChatSelected from './NoChatSelected';
import Sidebar from './Sidebar';
const mockChats = [
  { id: 1, name: 'Rohit', lastMessage: 'Hey, how are you?', time: '2m ago' },
  { id: 2, name: 'Ujjwal', lastMessage: 'See you tomorrow!', time: '1h ago' },
  { id: 3, name: 'Johnson', lastMessage: 'Thanks for the help!', time: '2h ago' },
];

const mockMessages = [
  { id: 1, text: 'Hey there!', sent: false, time: '10:00 AM' },
  { id: 2, text: 'Hi! How are you?', sent: true, time: '10:01 AM' },
  { id: 3, text: "I'm good, thanks for asking!", sent: false, time: '10:02 AM' },
  { id: 4, text: "That's great to hear!", sent: true, time: '10:03 AM' },
];

function Home() {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const location = useLocation();

  const {selectedUser}=useChatStore()

  return (
    <div className="h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex flex-col">
      <div className="flex-1 grid grid-cols-[300px_1fr_300px] p-4 gap-4 overflow-hidden">
        {/* Left Sidebar - Chat List */}
       
         <Sidebar/>
       

        {!selectedUser ? <NoChatSelected/> : <Chat/> }
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        
          <Link 
            to="/explore" 
            className={`nav-item ${location.pathname === '/explore' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FiCompass size={24} />
          </Link>
          <Link 
            to="/search" 
            className={`nav-item ${location.pathname === '/search' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FiSearch size={24} />
          </Link>
          <Link 
            to="/notifications" 
            className={`nav-item ${location.pathname === '/notifications' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FiHeart size={24} />
          </Link>
          <Link 
            to="/settings" 
            className={`nav-item ${location.pathname === '/settings' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FiSettings size={24} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Home;