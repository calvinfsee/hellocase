import { useMemo } from 'react';
import '../assets/stylesheets/Player.css';

export default function Player ({ name, coor, direction }) {
  const coordinates = useMemo(() => {
    const styles = {
      transform: coor
    }
    return styles;
  }, [coor]);
  //Player sprite is 32 x 48

  const dirStyle = useMemo(() => {
    const styles = {
      backgroundPositionY: `${direction * -48}px`
    }
    return styles;
  }, [direction]);



  return (
    <div className='Character grid-cell' style={coordinates}>
      <div className='Character_sprite grid-cell' style={dirStyle}></div>
      <div className='Character_name-container'>
        <span className='Character_name'>{name}</span>
      </div>
      <div className='Character_you-arrow'></div>
    </div>
  );
}