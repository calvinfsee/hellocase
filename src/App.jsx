import { useState, useEffect, useCallback, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, set, onDisconnect, onValue, onChildAdded } from 'firebase/database';
import './assets/stylesheets/App.css';
import GameContainer from "./components/GameContainer.jsx";
import SignIn from './components/SignIn.jsx';
import { auth, database } from './firebase.js';
import { randomSpot } from './helpers.js';

export default function App() {
  //player id needs to be a ref to mutate
  const playerId = useRef(null);
  const playerRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const uref = ref(database, `players/${uid}`);
        set(uref, {
          id: uid,
          name: 'Calvin',
          direction: 0,
          ...randomSpot()
        });
        onDisconnect(uref).remove();
        playerId.current = uid;
        playerRef.current = uref;
      } else {
        playerId.current = null;
        playerRef.current = null;
      }
    });

    signInAnonymously(auth)
    .then(() => {
      console.log('signed in!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {/* <SignIn /> */}
      {/* <GameContainer playerId={playerId} loading={loading} /> */}
    </div>
  )
}
