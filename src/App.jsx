import { useState, useEffect, useCallback, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { ref, set, onDisconnect, onValue, onChildAdded } from 'firebase/database';
import './assets/stylesheets/App.css';
import GameContainer from "./components/GameContainer.jsx";
import { auth, database } from './firebase.js';

export default function App() {
  const [playerData, setPlayerData] = useState(null);

  const [allPlayerRef, setAllPlayerRef] = useState(ref(database, `players`));
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const playerId = user.uid;
        const playerRef = ref(database, `players/${playerId}`);
        set(playerRef, {
          id: playerId,
          name: 'Calvin',
          direction: 'right',
          x: 2,
          y: 2
        });
        onDisconnect(playerRef).remove();
        setPlayerData({
          id: playerId,
          ref: playerRef
        });
      } else {
        setPlayerData(null);
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

  useEffect(() => {
    onValue(allPlayerRef, (snapshot) => {
      //Fires whenever change occurs
      const newPlayers = snapshot.val() || {};
      setPlayers(newPlayers);
    });
    onChildAdded(allPlayerRef, (snapshot) => {
      //Fires whenever a new node is added to the tree
      const addedPlayer = snapshot.val();
      setPlayers((prev) => {
        const newPlayerList = {...prev, addedPlayer};
        return newPlayerList;
      });
    });
  }, []);

  return (
    <div className="App">
      <GameContainer players={players} />
    </div>
  )
}
