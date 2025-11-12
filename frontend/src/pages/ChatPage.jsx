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
    <div className="relative w-full max-w-6xl h-[100vh] sm:h-[90vh] flex justify-center items-center px-1 sm:px-4 py-1 sm:py-4">
      <BorderAnimatedContainer>
        <div className="flex w-full h-full overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-md shadow-lg">

          {/* --- LEFT PANEL (Chat List) --- */}
          <div
            className={`${
              selectedUser ? "hidden sm:flex" : "flex"
            } flex-col w-full sm:w-80 bg-slate-800/70 transition-all duration-300`}
          >
            <div className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-md border-b border-slate-700">
              <ProfileHeader />
              <ActiveTabSwitch />
            </div>

            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/20">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* --- RIGHT PANEL (Chat Window) --- */}
          <div
            className={`${
              selectedUser ? "flex" : "hidden sm:flex"
            } flex-1 flex-col bg-slate-900/70 backdrop-blur-md relative transition-all duration-300`}
          >
            {/* Back button for mobile */}
            {selectedUser && (
              <button
                onClick={handleBack}
                className="sm:hidden absolute top-3 left-3 z-20 bg-slate-800/80 p-2 rounded-full hover:bg-slate-700 active:scale-95 transition-all"
              >
                <ArrowLeft size={22} className="text-cyan-400" />
              </button>
            )}

            {/* Chat Section */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/20">
              {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
