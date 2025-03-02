import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

function Settings() {
  const { logout ,authUser} = useAuthStore();


  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-gray-600 mb-4">Customize your app experience.</p>
        {authUser && (
              <>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
      </div>
    </div>
  );
}

export default Settings;