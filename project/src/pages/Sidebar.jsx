import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="bg-gray-800 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
          Messages
        </h2>
        <div className="mb-4 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-gray-300">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length} online)</span>
        </div>
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`bg-gray-700 cursor-pointer p-2 rounded-md hover:bg-gray-900 ${selectedUser?._id === user._id ? "bg-gray-700" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-100 truncate">{user.fullName}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
