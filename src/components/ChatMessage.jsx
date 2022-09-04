import '../assets/stylesheets/ChatMessage.css';

export default function ChatMessage ({ id, displayName, uid, text, createdAt }) {
  return (
    <div className='chat-message'>
      <span className='chat-message-user'>{displayName}:</span>
      <span className='chat-message-text'>{text}</span>
    </div>
  )
}