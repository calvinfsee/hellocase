import { createContext } from 'react';
import { firestore } from '../firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, limit, query } from 'firebase/firestore';

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

  const messagesRef = collection(firestore, 'messages').withConverter(messageConverter);
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messagesQuery);

  return (
    <ChatContext.Provider value={{ messages, messagesRef }}>
      {children}
    </ChatContext.Provider>
  )
}