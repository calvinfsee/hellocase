import { useRef, useState, useEffect } from 'react';
import { ref, set, onDisconnect, onValue, onChildAdded } from 'firebase/database';
import { auth, database } from '../firebase.js';

export default function useArrowKeys (playerId, playersRef) {
  const leftSafe = useRef(true);
  const rightSafe = useRef(true);
  const upSafe = useRef(true);
  const downSafe = useRef(true);

  function handleArrowPress (xChange = 0, yChange = 0) {
    const players = playersRef.current;
    const id = playerId.current;
    console.log(players);
    console.log(id);
    const newX = players[id].x + xChange;
    const newY = players[id].y + yChange;
    const newPlayerData = { ...players[id], x: newX, y: newY };
    set(ref(database, `players/${id}`), newPlayerData);
    console.log('my player: ', newX, ' ', newY);

      // setPlayers((prev) => {
      //   const myPlayer = {...prev[id], x: newX, y: newY};
      //   console.log('myPlayer: ', newX, ' ', newY);
      //   set(ref(database, `players/${id}`), myPlayer);
      //   return {...prev, [id]: myPlayer};
      // });
  }

  function keyDown (event) {
    switch (event.code) {
      case "ArrowLeft":
        if (leftSafe.current) {
          handleArrowPress(-1, 0);
          leftSafe.current = false;
        }
        break;
      case "ArrowRight":
        if (rightSafe.current) {
          handleArrowPress(1, 0);
          rightSafe.current = false;
        }
        break;
      case "ArrowUp":
        if (upSafe.current) {
          handleArrowPress(0, -1);
          upSafe.current = false
        }
        break;
      case "ArrowDown":
        if (downSafe.current) {
          handleArrowPress(0, 1);
          downSafe.current = false;
        }
        break;
      default:
        break;
    }
  }
  function keyUp (event) {
    switch (event.code) {
      case "ArrowLeft":
        leftSafe.current = true;
        break;
      case "ArrowRight":
        rightSafe.current = true;
        break;
      case "ArrowUp":
        upSafe.current = true;
        break;
      case "ArrowDown":
        downSafe.current = true;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  }, []);
}