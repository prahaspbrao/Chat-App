import BorderAnimatedContainer from "../components/Border.jsx";
import useChatStore  from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatsList.jsx";
import Contactlist from "../components/ChatsList.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx"
import ChatContainer from "../components/ChatContainer.jsx";

function ChatPage() {
  const { activeTab  , selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* left side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col ">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2 ">
            {activeTab === "chats" ? <ChatList /> : <Contactlist />}
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm  ">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
