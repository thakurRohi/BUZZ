import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { FiMessageSquare, FiUser } from "react-icons/fi";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { getUsers, users, isUsersLoading , selectedUser, setSelectedUser} = useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          
          Messages
        </h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`chat-item ${setSelectedUser?._id === user._id ? "active" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="avatar w-12 h-12 rounded-full flex items-center justify-center">
                  <img
                    src={user.profilePic || "/avatar.png"}
                   
                    className="w-full h-full object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="online-indicator absolute top-2 right-2 rounded-full bg-green-500 p-1 text-white text-sm font-semibold">
                      ONLINE
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold truncate">{user.fullName}</h3>
                  </div>
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
