import "../assets/stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';
import Player from './Player.jsx';

export default function GameContainer () {
  useArrowKeys();

  const name = "Calvin";
  const x = 2;
  const y = -4;
  const coor = `translate3d(${33 * x - 1}px, ${33 * y - 2}px, 0)`;

  return (
    <div id="game-container">
      <Player name={name} coor={coor} />
    </div>
  )
}