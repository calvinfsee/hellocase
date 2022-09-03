import { useState, useEffect, useCallback, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, set, onDisconnect, onValue, onChildAdded } from 'firebase/database';
import './assets/stylesheets/App.css';
import { auth, database } from './firebase.js';
import { randomSpot } from './helpers.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import GameContainer from "./components/GameContainer.jsx";
import SignIn from './components/SignIn.jsx';
import SignOut from './components/SignOut.jsx';

export default function App() {
  //player id needs to be a ref to mutate
  const playerId = useRef(null);
  const playerRef = useRef(null);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      playerId.current = user.uid;
      playerRef.current = ref(database, `players/${user.uid}`);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="App">
      {user ? <SignOut setLoading={setLoading} /> : null}
      {user ? <h1>Signed In</h1> : <SignIn />}
      {loading ? null : <GameContainer playerId={playerId} playerRef={playerRef} /> }
    </div>
  )
}
