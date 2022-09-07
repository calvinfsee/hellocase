import { createContext, useState, useEffect, useRef } from 'react';
import { firestore } from '../firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, limit, query, where } from 'firebase/firestore';

export const ChatContext = createContext({});

export class Message {
  constructor(id, createdAt, text, uid, displayName) {
    this.id = id;
    this.createdAt = createdAt;
    this.text = text;
    this.uid = uid;
    this.displayName = displayName;
  }
}

const messageConverter = {
  toFirestore: function (message) {
    return {
      createdAt: message.createdAt,
      text: message.text,
      uid: message.uid,
      displayName: message.displayName
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Message(snapshot.id, data.createdAt, data.text, data.uid, data.displayName);
  }
}

export default function ChatContextProvider ({ children }) {
  //! Verify that the useCollectionData hook actually detaches the snapshot listener on unmounting
  const [loggedInAt, setLoggedInAt] = useState(new Date());
  const messagesRef = collection(firestore, 'messages').withConverter(messageConverter);
  const messagesQuery = query(messagesRef, where('createdAt', '>=', loggedInAt), orderBy('createdAt'));
  const [messages] = useCollectionData(messagesQuery);
  const lastRead = useRef(0);
  const [playerMessages, setPlayerMessages] = useState({});

  useEffect(() => {
    if (messages) {
      setPlayerMessages((prev) => {
        let newMessages = prev;
        let i = lastRead.current;
        while (i < messages.length) {
          let msg = messages[i];
          if (!newMessages[msg.uid]) {
            newMessages[msg.uid] = [];
          }
            newMessages[msg.uid].push(msg);
          i++;
        }
        lastRead.current = i;
        return newMessages;
      });
    }
  }, [messages]);

  return (
    <ChatContext.Provider value={{ messages, messagesRef, playerMessages }}>
      {children}
    </ChatContext.Provider>
  )
}