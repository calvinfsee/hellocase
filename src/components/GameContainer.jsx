import "../assets/stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';
import Player from './Player.jsx';
import { ref, set, onDisconnect, onValue, onChildAdded, get, child } from 'firebase/database';
import { auth, database } from '../firebase.js';
import { randomSpot } from '../helpers.js';

export default function GameContainer ({ playerId, playerRef }) {
  const [players, setPlayers] = useState({});
  const allPlayerRef = useRef(ref(database, `players`));
  const playersRef = useRef(players);
  const [newPlayer, setNewPlayer] = useState(true);

  useEffect(() => {
    onValue(allPlayerRef.current, (snapshot) => {
      //Fires whenever change occurs
      const newPlayers = snapshot.val() || {};
      playersRef.current = newPlayers;
      setPlayers(newPlayers);
    });
    onChildAdded(allPlayerRef.current, (snapshot) => {
      //Fires whenever a new node is added to the tree
      const addedPlayer = snapshot.val();
      setPlayers((prev) => {
        const newPlayerList = {...prev, [addedPlayer.id]: addedPlayer };
        playersRef.current = newPlayerList;
        return newPlayerList;
      });
    });
  }, []);

  useEffect(() => {
    const uid = playerId.current;
    const uref = playerRef.current;
    const dbRef = ref(database);

    get(child(dbRef, `players/${uid}`))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          set(uref, {
            id: uid,
            name: 'Calvin',
            direction: 0,
            ...randomSpot()
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useArrowKeys(playerId, playersRef);

  function renderPlayers () {
    const playerIds = Object.keys(players);
    return playerIds.map((id) => {
      const {name, direction, x, y} = players[id];
      const coor = `translate3d(${32 * x - 1}px, ${32 * y - 2}px, 0)`;

      return (<Player key={id + coor} name={name} dir={direction} coor={coor} />);
    });
  }

  return (
    <div id="game-container">
      {renderPlayers()}
    </div>
  )
}