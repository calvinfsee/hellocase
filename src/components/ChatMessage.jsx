import "../assets/stylesheets/ChatMessage.css";
import { auth } from "../firebase.js";
import { useState } from "react";

export default function ChatMessage({ id, displayName, uid, text, createdAt }) {
  const [isUser, setIsUser] = useState(
    auth.currentUser.displayName && auth.currentUser.displayName === displayName
  );

  return (
    <div className="chat-message">
      <span className={isUser ? "chat-message-user me" : "chat-message-user"}>
        {displayName}:{" "}
      </span>
      <span className="chat-message-text">{text}</span>
    </div>
  );
}
