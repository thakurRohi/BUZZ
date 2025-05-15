import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center relative bg-base-100/50">
      {/* Top Right Logo */}
      <div className="fixed top-4 right-4 rounded-md overflow-hidden">
        <img 
          src="/Untitled Project.jpg" 
          alt="Vartalaap Logo" 
          className="w-24 h-auto object-contain"
        />
      </div>

      <div className="max-w-md text-center space-y-6 p-16">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-slate-100">Welcome to Vartalaap!</h2>
        <p className="text-base-content/60 text-slate-100">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;