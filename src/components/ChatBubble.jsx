import '../assets/stylesheets/ChatBubble.css';
import { ChatContext } from './ChatContextProvider.jsx';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';


export default function ChatBubble ({ id, displayName, uid, text, createdAt }) {
  const { messages, messagesRef } = useContext(ChatContext);
  useEffect(() => {
  }, [messages]);

  function recentMessages () {
    const now = moment().subtract(1, 'minutes');
    const i = messages.length - 1;
    while (i > 0) {
      let createdAt = moment(messages[i].createdAt);
      if (createdAt.diff(now)) {

      }
    }
  }

  return (
    <div className='chat-bubble-container'>
      <div className='chat-bubble'>
      </div>
      <div className='chat-bubble-arrow'></div>
    </div>
  );
}