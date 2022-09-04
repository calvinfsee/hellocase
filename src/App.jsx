import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onDisconnect, update } from 'firebase/database';
import './assets/stylesheets/App.css';
import { auth, database } from './firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import GameContainer from './components/GameContainer.jsx';
import SignIn from './components/SignIn.jsx';
import SignOut from './components/SignOut.jsx';
import ChatLog from './components/ChatLog.jsx';
import ChatContextProvider from './components/ChatContextProvider.jsx';

//TODO: Create App Context to clean up prop drilling
export default function App() {
  //player id needs to be a ref to mutate
  const playerId = useRef(null);
  const playerRef = useRef(null);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const uref = ref(database, `players/${uid}`);
        onDisconnect(uref).update({ online: false });
        update(uref, { online: true });
        playerId.current = uid;
        playerRef.current = uref;
        setLoading(false);
      } else {
        playerId.current = null;
        playerRef.current = null;
        setLoading(true);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className='App'>
      {user ? <SignOut setLoading={setLoading} user={user} /> : null}
      {user ? <h1>Signed In</h1> : <SignIn />}
      {loading ? null : <ChatRoom playerId={playerId} playerRef={playerRef} />}
    </div>
  )
}

function ChatRoom ({ playerId, playerRef }) {
  return (
    <ChatContextProvider>
      <GameContainer playerId={playerId} playerRef={playerRef} />
      <ChatLog />
    </ChatContextProvider>
  )
}