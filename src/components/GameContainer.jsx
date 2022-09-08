import '../assets/stylesheets/GameContainer.css';
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';
import Player from './Player.jsx';
import { ref, onDisconnect, onValue, onChildAdded, get, child, update } from 'firebase/database';
import { auth, database } from '../firebase.js';
import { randomSpot } from '../helpers.js';
import CreateCharacter from './CreateCharacter.jsx';
import ChatBubble from './ChatBubble.jsx';

export default function GameContainer ({ playerId, playerRef }) {
  const [players, setPlayers] = useState({});
  const allPlayerRef = useRef(ref(database, `players`));
  const playersRef = useRef(players);
  const [hasChar, setHasChar] = useState(true);

  useEffect(() => {
    const unsubOne = onValue(allPlayerRef.current, (snapshot) => {
      //Fires whenever change occurs
      const newPlayers = snapshot.val() || {};
      playersRef.current = newPlayers;
      setPlayers(newPlayers);
    });
    const unsubTwo = onChildAdded(allPlayerRef.current, (snapshot) => {
      //Fires whenever a new node is added to the tree
      const addedPlayer = snapshot.val();
      setPlayers((prev) => {
        const newPlayerList = {...prev, [addedPlayer.uid]: addedPlayer };
        playersRef.current = newPlayerList;
        return newPlayerList;
      });
    });

    return () => {
      playersRef.current = {};
      setPlayers({});
      unsubOne();
      unsubTwo();
    }
  }, []);

  //Check if the player has a character in the database
  useEffect(() => {
    const { uid } = auth.currentUser;
    const uref = playerRef.current;
    const dbRef = ref(database);

    get(child(dbRef, `players/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists() && snapshot.val().name) {
          // update(uref, { online: true });
        } else {
          console.log('GameContainer setHasChar to false');
          setHasChar(false);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    playersRef.current = players;
  }, [hasChar]);

  useArrowKeys(playerId, playersRef, setHasChar);

  function renderPlayers () {
    const playerIds = Object.keys(players);
    return playerIds.map((uid) => {
      const player = players[uid];
      return player && player.online && player.name ? (<Player key={uid} {...player} />) : null;
    });
  }

  return (
    <div id='game-container'>
      {/* <ChatBubble /> */}
      {hasChar ? null : <CreateCharacter players={players} setHasChar={setHasChar} playerId={playerId} playerRef={playerRef} />}
      {renderPlayers()}
    </div>
  )
}