import '../assets/stylesheets/CreateCharacter.css';
import { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database'
import { sanitized } from '../helpers.js';

export default function CreateCharacter ({ setHasChar, playerId, playerRef }) {
  const [char, setChar] = useState({
    name: '',
    p1: '',
    p2: '',
    sprite: 'russia'
  });

  function handleTextChange (e) {
    const newText = e.target.value;
    if (!sanitized(newText)) {
      console.error('Bad input!');
      return;
    }
    setChar((prev) => {
      const newState = { ...prev, [e.target.id]: newText };
      return newState;
    });
  }

  function handleSubmit () {
    const uid = playerId.current;
    const uref = playerRef.current;
    const { name, p1, p2, sprite} = char;
    const pronouns = p1 + '/' + p2;
    if (name.length > 1 && sanitized(name)) {
      const newCharacter = {
        id: uid,
        direction: 0,
        name,
        pronouns: pronouns.length > 1 ? pronouns : 'They/Them',
        online: true,
        sprite,
        x: -5,
        y: -4,
      };
      set(uref, newCharacter);
      setHasChar(true);
    } else {
      console.log('invalid');
    }
  }

  return (
    <div id='create-char'>
      <h2 className='modal-header'>CREATE YOUR CHARACTER</h2>
      <div className='modal-fields-container'>
        <div className='modal-field'>
          <h3 className='modal-form-label'>NAME:</h3>
          <input
            type='text'
            className='modal-form-input'
            id='name' value={char.name}
            placeholder={'My name...'}
            onChange={handleTextChange}
          />
        </div>
        <div className='modal-field'>
          <h3 className='modal-form-label'>PRONOUNS:</h3>
          <div className='modal-pronouns-container'>
            <input
              type='text'
              className='modal-pronouns'
              id='p1' value={char.p1}
              placeholder={'They'}
              onChange={handleTextChange}
            />
            <h4 className='modal-form-label'>/</h4>
            <input
              type='text'
              className='modal-pronouns'
              id='p2' value={char.p2}
              placeholder={'Them'}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
      <button className='done' onClick={handleSubmit}>
        DONE
      </button>
    </div>
  )
}