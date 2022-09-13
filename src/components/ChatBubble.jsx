import "../assets/stylesheets/ChatBubble.css";
import { ChatContext } from "./ChatContextProvider.jsx";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import moment from "moment";

export default function ChatBubble({ uid }) {
  const { playerMessages } = useContext(ChatContext);
  const [displayState, setDisplayState] = useState({
    displayText: "",
    queuePos: 0,
  });
  const [show, setShow] = useState(false);

  const displayMessage = useCallback(() => {
    if (playerMessages[uid] && !show) {
      setDisplayState((prev) => {
        if (prev.queuePos >= playerMessages[uid].length) {
          return prev;
        }
        let newDisplayState = {
          displayText: playerMessages[uid][prev.queuePos],
          queuePos: prev.queuePos + 1,
        };
        return newDisplayState;
      });
      setShow(true);
    }
  }, [displayState, playerMessages, show]);

  useEffect(() => {
    displayMessage();
  }, [playerMessages, displayState, show]);

  const onAnimationEnd = useCallback(() => {
    console.log("animation end!");
    setShow(false);
  }, [displayState]);

  return (
    <div
      className={
        show ? "chat-bubble-container display" : "chat-bubble-container"
      }
      onAnimationEnd={onAnimationEnd}
    >
      <div className="chat-bubble">{displayState.displayText}</div>
      <div className="chat-bubble-arrow"></div>
    </div>
  );
}
