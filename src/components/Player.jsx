import { useMemo, useEffect, useRef, useState, useContext } from 'react';
import ChatBubble from './ChatBubble.jsx';
import '../assets/stylesheets/Player.css';

export default function Player ({ name, direction, x, y, uid, sprite }) {

  const lastX = useRef(x);
  const lastY = useRef(y);
  const dirRef = useRef({
    backgroundPositionY: `${direction * -48}px`
  });
  const animationRef = useRef('Character_sprite grid-cell');
  const [spriteClass, setSpriteClass] = useState('Character_sprite grid-cell');

  const spriteStyle = useMemo(() => {
    const backgroundPositionY = `${direction * -48}px`;
    const backgroundPositionX = '0px';
    const styles = {
      background: `url(src/assets/images/sprites/${sprite})`,
      backgroundPositionY
    }
    return styles;
  }, [direction]);
  useEffect(() => {
    if (lastX.current !== x || lastY.current !== y) {
      lastX.current = x;
      lastY.current = y;
      setSpriteClass('Character_sprite grid-cell moving');
    }
  }, [x, y]);
  function onAnimationEnd () {
    setSpriteClass('Character_sprite grid-cell');
  }

  const coordinates = useMemo(() => {
    const transform = `translate3d(${32 * x - 1}px, ${32 * y - 2}px, 0)`;
    const zIndex = y;
    const styles = {
      transform,
      zIndex
    }
    return styles;
  }, [x, y]);
  //Player sprite is 32 x 48

  const defaultCoor = {
    transform: `translate3d(-161px, -98px, 0)`
  };

  return (
    <div id={uid} className='Character grid-cell' style={coordinates ? coordinates : defaultCoor}>
      {/* <ChatBubble uid={uid} /> */}
      <div className={spriteClass} style={spriteStyle} onAnimationEnd={onAnimationEnd}></div>
      <div className='Character_name-container'>
        <span className='Character_name'>{name}</span>
      </div>
      <div className='Character_you-arrow'></div>
    </div>
  );
}