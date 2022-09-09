import '../assets/stylesheets/SpriteSelector.css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useState, useEffect, useRef, useCallback } from 'react';
import { spriteFileNames } from '../helpers.js';

export default function SpriteSelector ({ pos, setPos }) {
  const carouselRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const scrollRight = useCallback(() => {
    if (!clicked) {
      setClicked(true);
      carouselRef.current.scrollBy({
        left: 42,
        behavior: "smooth"
      });
      setPos((prev) => prev + 1);
      setTimeout(() => setClicked(false), 250);
    }
  });
  const scrollLeft = useCallback(() => {
    if (!clicked) {
      setClicked(true);
      carouselRef.current.scrollBy({
        left: -42,
        behavior: "smooth"
      });
      setPos((prev) => prev - 1);
      setTimeout(() => setClicked(false), 250);
    }
  });

  useEffect(() => {

  }, []);

  function renderSprites () {
    return spriteFileNames.map((sprite, i) => {
      const styles = {
        background: `url(/sprites/${sprite})`,
      }
      const spriteClass = i === pos ? 'sprite sprite-cell selected' : 'sprite sprite-cell';
      return (
        <div className='sprite-container sprite-cell' key={sprite}>
          <div className={spriteClass} style={styles} />
        </div>
      );
    });
  }

  return (
    <div id='sprite-selector-container'>
      <div className='arrow'>
        <MdOutlineKeyboardArrowLeft size={25} onClick={scrollLeft} color={'#945521'} />
      </div>
        <div id='sprite-selector-viewport' ref={carouselRef}>
          <div id='sprite-selector'>
            {renderSprites()}
          </div>
        </div>
      <div className='arrow'>
        <MdOutlineKeyboardArrowRight size={25} onClick={scrollRight} color={'#945521'} />
      </div>
    </div>
  )
}