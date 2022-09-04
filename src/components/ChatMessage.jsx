import '../assets/stylesheets/ChatMessage.css';

export default function ChatMessage ({ id, username, uid, text, createdAt }) {
  return (
    <div className='chat-message'>
      <span className='chat-message-user'>{username}:</span>
      <span className='chat-message-text'>{text}</span>
    </div>
  )
}