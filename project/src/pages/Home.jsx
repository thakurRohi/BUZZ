import { useState } from 'react';
import { FiUser, FiMessageSquare, FiSettings, FiHome, FiSearch, FiHeart, FiCompass } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message handling logic here
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex flex-col">
      <div className="flex-1 grid grid-cols-[300px_1fr_300px] p-4 gap-4 overflow-hidden">
        {/* Left Sidebar - Chat List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiMessageSquare className="text-primary" />
              Messages
            </h2>
            <div className="space-y-3">
              {mockChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar w-12 h-12 rounded-full flex items-center justify-center">
                      <FiUser size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold truncate">{chat.name}</h3>
                        <span className="text-xs opacity-75">{chat.time}</span>
                      </div>
                      <p className="text-sm truncate opacity-75">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="border-b border-gray-200/50 p-4">
            <div className="flex items-center gap-3">
              <div className="avatar w-10 h-10 rounded-full flex items-center justify-center">
                <FiUser size={20} className="text-white" />
              </div>
              <h2 className="font-semibold text-gray-800">
                {mockChats.find(chat => chat.id === activeChat)?.name}
              </h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`message-bubble ${message.sent ? 'message-bubble-sent' : 'message-bubble-received'}`}>
                  <p>{message.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200/50 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Profile */}
        <div className="profile-card">
          <div className="text-center">
            <div className="avatar w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input type="text" value="User Name" className="input-field" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input type="email" value="user@example.com" className="input-field" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <select className="input-field">
                <option>Online</option>
                <option>Away</option>
                <option>Do Not Disturb</option>
              </select>
            </div>
            <button className="btn-primary w-full">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center">
          <Link 
            to="/home" 
            className={`nav-item ${location.pathname === '/home' ? 'text-primary' : 'text-gray-600'}`}
          >
            <FiHome size={24} />
          </Link>
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