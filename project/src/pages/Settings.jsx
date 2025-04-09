import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FiCamera } from "react-icons/fi";
import { Mail, User} from "lucide-react"
import { useState } from "react";
function Settings() {
  const { logout, authUser , isUpdatingProfile , updateProfile } = useAuthStore();
  
  const [selectedImage , setSelectedImage]=useState(null);

  const handleImageUpload=async(e)=>{
    const file=e.target.files[0]
    if(!file) return ;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload=async()=>{
      const base64Image=reader.result;
      setSelectedImage(base64Image)
      await updateProfile({profilePic:base64Image})
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        
        {/* Left Side - Settings Panel */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600 mb-6">Customize your app experience.</p>

          {authUser && (
            <button 
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Right Side - Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <div className="flex flex-col items-center gap-4">
  <div className="relative">
    {/* Profile Image */}
    <img
      src={selectedImage || authUser.profilePic ||  "/avatar.png"} // Replace dynamically in logic
  
      className="size-32 rounded-full object-cover border-4"
    />
    
    {/* Camera Icon - Opens File Selector */}
    <label
      htmlFor="avatar-upload"
      className={
        `
          absolute bottom-0 right-0 
        bg-base-content hover:scale-105
        p-2 rounded-full cursor-pointer 
        transition-all duration-200 *
        ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
        `
      }
    >
      <FiCamera className="w-5 h-5 text-base-200" />
      
      {/* Hidden File Input */}
      <input
        type="file"
        id="avatar-upload"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUpdatingProfile}
      />
    </label>
  </div>
        <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
         </p>
</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;
