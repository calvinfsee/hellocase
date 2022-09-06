import { useMemo, useEffect, useRef, useState } from 'react';
import '../assets/stylesheets/Player.css';

export default function Player ({ name, direction, x, y, uid }) {
  const lastX = useRef(x);
  const lastY = useRef(y);
  const dirRef = useRef({
    backgroundPositionY: `${direction * -48}px`
  });
  const animationRef = useRef('Character_sprite grid-cell');
  const [spriteClass, setSpriteClass] = useState('Character_sprite grid-cell');

  const dirStyle = useMemo(() => {
    const backgroundPositionY = `${direction * -48}px`;
    const backgroundPositionX = '0px';
    const styles = {
      backgroundPositionY
    }

    return styles;
  }, [direction]);
  useEffect(() => {
    if (lastX.current !== x || lastY.current !== y) {
      console.log('animate!');
      lastX.current = x;
      lastY.current = y;
      setSpriteClass('Character_sprite grid-cell moving');
    }
  }, [x, y]);
  function onAnimationEnd () {
    setSpriteClass('Character_sprite grid-cell');
  }

  const coordinates = useMemo(() => {
    const coor = `translate3d(${32 * x - 1}px, ${32 * y - 2}px, 0)`;
    const styles = {
      transform: coor
    }
    return styles;
  }, [spriteClass]);
  //Player sprite is 32 x 48

  const defaultCoor = {
    transform: `translate3d(-161px, -98px, 0)`
  };

  return (
    <div id={uid} className='Character grid-cell' style={coordinates ? coordinates : defaultCoor}>
      <div className={spriteClass} style={dirStyle} onAnimationEnd={onAnimationEnd}></div>
      <div className='Character_name-container'>
        <span className='Character_name'>{name}</span>
      </div>
      <div className='Character_you-arrow'></div>
    </div>
  );
}