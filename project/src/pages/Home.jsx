// src/pages/Home.js
import { useState } from 'react';
import { FiCompass, FiSearch, FiHeart, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Chat from './Chat';
import { useChatStore } from './../store/useChatStore';
import NoChatSelected from './NoChatSelected';
import Sidebar from './Sidebar';
import useIsMobile from '../hooks/useIsMobile';

function Home() {
  const location = useLocation();
  const { selectedUser } = useChatStore();
  const isMobile = useIsMobile();

  // Mobile layout: show Sidebar if no user is selected; otherwise show Chat.
  if (isMobile) {
    return (
      <div className="h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex flex-col">
        <div className="flex-1 overflow-hidden">
          {!selectedUser ? <Sidebar /> : <Chat />}
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

  // Desktop layout: use the original grid layout.
  return (
    <div className="h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex flex-col">
      <div className="flex-1 grid grid-cols-[300px_1fr_300px] p-4 gap-4 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />
        {/* Main content area: Chat or NoChatSelected */}
        {!selectedUser ? <NoChatSelected /> : <Chat />}
        {/* The third column can be used for additional content if needed */}
      </div>
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
