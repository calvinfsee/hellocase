import { createContext } from 'react';
import { firestore } from '../firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, limit, query } from 'firebase/firestore';

export const ChatContext = createContext({});

export default function ChatContextProvider ({ children }) {
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  return (
    <ChatContext.Provider value={{ messages }}>
      {children}
    </ChatContext.Provider>
  )
}