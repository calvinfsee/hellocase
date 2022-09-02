import "../assets/stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';
import Player from './Player.jsx';

export default function GameContainer ({ players, id }) {
  useArrowKeys();

  // const name = "Calvin";
  // const x = 2;
  // const y = -4;
  // const coor = `translate3d(${33 * x - 1}px, ${33 * y - 2}px, 0)`;

  function renderPlayers () {
    const playerIds = Object.keys(players);
    return playerIds.map((id) => {
      const {name, direction, x, y} = players[id];
      const coor = `translate3d(${33 * x - 1}px, ${33 * y - 2}px, 0)`;

      return (<Player key={id + coor} name={name} dir={direction} coor={coor} />);
    });
  }

  return (
    <div id="game-container">
      {renderPlayers()}
    </div>
  )
}