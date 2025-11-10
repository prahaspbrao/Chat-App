import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js';
import ChatHeader from './ChatHeader.jsx';

function ChatContainer() {

    const {getMessagesByUserId , messages , selectedUser} = useChatStore();
    const {authUser} = useAuthStore();

    useEffect(() => {
        getMessagesByUserId(selectedUser._id);
    } , [getMessagesByUserId , selectedUser])
  return (
    <>
    <ChatHeader />

    </>
  )
}

export default ChatContainer