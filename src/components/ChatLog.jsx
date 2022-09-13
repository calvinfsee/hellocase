import "../assets/stylesheets/ChatLog.css";
import { useContext, useState, useRef } from "react";
import { ChatContext } from "./ChatContextProvider.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { sanitized } from "../helpers.js";
import { auth } from "../firebase.js";
import { serverTimestamp, addDoc } from "firebase/firestore";

export default function ChatLog() {
  const { messages, messagesRef } = useContext(ChatContext);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  //! Research whether Sanitizing text is neccessary for chat log
  function handleOnChange(e) {
    const newText = e.target.value;
    if (!sanitized(newText)) {
      console.error("Bad input!");
      return;
    }
    setText(newText);
  }

  async function handleSubmit(e) {
    const { uid, displayName } = auth.currentUser;
    if (e.key === "Enter" && text.length > 0) {
      if (!sanitized(text)) {
        console.error("invalid input!");
        return;
      }
      await addDoc(messagesRef, {
        createdAt: serverTimestamp(),
        text,
        uid,
        displayName,
      });
      setText("");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div id="chat-log-wrapper">
      <div id="inner-wrapper">
        <div id="chat-log-container">
          <div id="chat-log">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} {...msg} />)}
            <span ref={scrollRef} />
          </div>
        </div>
        <input
          type="text"
          id="chat-input"
          placeholder={"send a message"}
          value={text}
          onChange={handleOnChange}
          onKeyPress={handleSubmit}
        />
      </div>
    </div>
  );
}
