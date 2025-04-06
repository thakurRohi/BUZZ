import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="pt-20  border-base-300 bg-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar rounded-full overflow-hidden">
            <div className="size-10  border border-base-300">
              <img src={selectedUser.profilePic || "/avatar.png"}  />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-lg text-zinc-200">{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-zinc-200"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 text-zinc-200 rounded-full hover:bg-base-300 transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;