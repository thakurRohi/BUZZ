// src/pages/Home.js
import { useState } from 'react';
import { FiCompass, FiSearch, FiHeart, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import Chat from './Chat';
import { useChatStore } from './../store/useChatStore';
import NoChatSelected from './NoChatSelected';
import Sidebar from './Sidebar';
import useIsMobile from '../hooks/UseIsMobile.jsx';

function Home() {
  const location = useLocation();
  const { selectedUser } = useChatStore();
  const isMobile = useIsMobile();

  const Logo = () => (
    <div className="fixed top-4 right-4 rounded-md overflow-hidden z-50">
      <img 
        src="/public/Untitled Project.jpg" 
        alt="Vartalaap Logo" 
        className="w-24 h-14 object-contain"
      />
    </div>
  );
  const Logo1 = () => (
    <div className="fixed top-4 right-4 rounded-md overflow-hidden z-50">
      
    </div>
  );

  const LegalFooter = () => (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">Vartalaap is a modern chat application designed to connect people across the globe.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@vartalaap.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Chat Street, Digital City</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Vartalaap. All rights reserved.</p>
      </div>
    </footer>
  );

  // Add CSS class for hiding scrollbar
  const scrollableStyle = "scrollbar-hide overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']";

  // Mobile layout: show Sidebar if no user is selected; otherwise show Chat.
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col">
        
        <div className={`flex-1 ${scrollableStyle}`}>
          {!selectedUser ? (
            <>
            <Logo/>
              <Sidebar />
              {!selectedUser && <LegalFooter />}
            </>
          ) : (
           <> <Chat /> && <Logo1/> </>
          )}
        </div>
        <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-2">
          <div className="max-w-screen-xl mx-auto flex justify-around items-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col">
      
      <div className="flex-1 grid grid-cols-[300px_1fr_300px] p-4 gap-4">
        {/* Left Sidebar */}
        <Sidebar />
        {/* Main content area: Chat or NoChatSelected */}
        {!selectedUser ? (
          <div className={scrollableStyle}>
            <NoChatSelected />
            <LegalFooter />
          </div>
        ) : (
          <Chat />
        )}
        {/* The third column can be used for additional content if needed */}
      </div>
      <nav className="bg-slate-300 backdrop-blur-sm border-t border-gray-200/50 px-4 py-2">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center">
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
