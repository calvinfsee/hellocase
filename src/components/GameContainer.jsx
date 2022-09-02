import "../assets/stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';

export default function GameContainer () {
  useArrowKeys();

  return (
    <div id="game-container">

    </div>
  )
}