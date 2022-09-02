import "../stylesheets/GameContainer.css";
import { useState, useEffect, useRef } from 'react';
import useArrowKeys from '../hooks/useArrowKeys.jsx';

export default function GameContainer () {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const obj = useRef(null);
  useArrowKeys(setCount, setOtherCount, obj);

  return (
    <div id="game-container">
      <h1 id="count">{count} {otherCount}</h1>
    </div>
  )
}