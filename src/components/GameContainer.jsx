import "../assets/stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';
import Player from './Player.jsx';
import { ref, set, onDisconnect, onValue, onChildAdded } from 'firebase/database';
import { auth, database } from '../firebase.js';

export default function GameContainer ({ playerId, loading }) {
  const [players, setPlayers] = useState({});
  const allPlayerRef = useRef(ref(database, `players`));
  const playersRef = useRef(players);

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
        const newPlayerList = {...prev, addedPlayer};
        playersRef.current = newPlayerList;
        return newPlayerList;
      });
    });
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