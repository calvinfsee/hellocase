import { createContext, useState, useEffect, useRef, useMemo } from 'react';
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
  // const lastRead = useRef(0);
  // const [playerMessages, setPlayerMessages] = useState({});

  //! FIX THIS
  // useEffect(() => {
  //   if (messages) {
  //     let newPlayerMessages = {};
  //     for (let i = 0; i < messages.length; i++) {
  //       let msg = messages[i];
  //       if (!newPlayerMessages[msg.uid]) {
  //         newPlayerMessages[msg.uid] = [];
  //       }
  //       newPlayerMessages[msg.uid].push(msg.text);
  //     }
  //     setPlayerMessages(newPlayerMessages);
  //   }
  // }, [messages]);

  // useEffect(() => {
  //   if (messages) {
  //     setPlayerMessages((prev) => {
  //       let newPlayerMessages = deepCopy(prev);
  //       console.log(newPlayerMessages);
  //       console.log(lastRead.current);
  //       while (lastRead.current < messages.length) {
  //         let msg = messages[lastRead.current];
  //         if (!newPlayerMessages[msg.uid]) {
  //           newPlayerMessages[msg.uid] = [];
  //         }
  //         newPlayerMessages[msg.uid].push(msg.text);
  //         lastRead.current++;
  //       }
  //       console.log(newPlayerMessages);
  //       return newPlayerMessages;
  //     });
  //   }
  // }, [messages])
  // async function deepCopy (obj) {
  //   let newObj = {};
  //   for (let id in obj) {
  //     newObj[id] = obj[id].slice();
  //   }
  //   return newObj;
  // }

  return (
    <ChatContext.Provider value={{ messages, messagesRef }}>
      {children}
    </ChatContext.Provider>
  )
}