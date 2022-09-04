import '../assets/stylesheets/ChatLog.css';
import { useContext } from 'react';
import { ChatContext } from './ChatContextProvider.jsx';

export default function ChatLog () {
  return (
    <div id='chat-log-container'>
      <h2 className='chat-log-header'>Chat Log</h2>
      <div id='chat-log'>

      </div>
    </div>
  )
}