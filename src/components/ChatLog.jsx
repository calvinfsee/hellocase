import '../assets/stylesheets/ChatLog.css';
import { useContext, useState } from 'react';
import { ChatContext } from './ChatContextProvider.jsx';
import ChatMessage from './ChatMessage.jsx';
import { sanitized } from '../helpers.js';
import { auth } from '../firebase.js';
import { serverTimestamp, addDoc } from 'firebase/firestore';

export default function ChatLog () {
  const { messages, messagesRef } = useContext(ChatContext);
  const [text, setText] = useState('');

  //! Research whether Sanitizing text is neccessary for chat log
  function handleOnChange (e) {
    const newText = e.target.value;
    if (!sanitized(newText)) {
      console.error('Bad input!');
      return;
    }
    setText(newText);
  }

  async function handleSubmit (e) {
    const { uid, displayName } = auth.currentUser;
    if (e.key === 'Enter' && text.length > 0) {
      if (!sanitized(text)) {
        console.error('invalid input!');
        return;
      }
      await addDoc(messagesRef, {
        createdAt: serverTimestamp(),
        text,
        uid,
        displayName
      });
      setText('');
    }
  }

  return (
    <div id='chat-log-container'>
      <h2 className='chat-log-header'>Chat Log</h2>
      <div id='chat-log'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} />)}
      </div>
      <input
        type='text'
        id='chat-input'
        placeholder={'send a message'}
        value={text}
        onChange={handleOnChange}
        onKeyPress={handleSubmit}
      />
    </div>
  )
}