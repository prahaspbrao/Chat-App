import BorderAnimatedContainer from "../components/Border.jsx";
import useChatStore from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatsList.jsx";
import ContactList from "../components/Contactlist.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import { ArrowLeft } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  const handleBack = () => setSelectedUser(null);

  return (
    <div className="relative w-full max-w-6xl h-[85vh] sm:h-[800px] flex justify-center items-center px-2 sm:px-4">
      <BorderAnimatedContainer>
        {/* --- LEFT PANEL --- */}
        <div
          className={`${
            selectedUser ? "hidden sm:flex" : "flex"
          } w-full sm:w-80 bg-slate-800/50 backdrop-blur-sm flex-col transition-all duration-300`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* --- RIGHT PANEL (CHAT VIEW) --- */}
        <div
          className={`${
            selectedUser ? "flex" : "hidden sm:flex"
          } flex-1 flex-col bg-slate-900/60 backdrop-blur-sm relative transition-all duration-300`}
        >
          {/* Back button on mobile */}
          {selectedUser && (
            <button
              onClick={handleBack}
              className="sm:hidden absolute top-3 left-3 z-20 bg-slate-800/70 p-2 rounded-full hover:bg-slate-700 transition-all"
            >
              <ArrowLeft size={20} className="text-cyan-400" />
            </button>
          )}

          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
