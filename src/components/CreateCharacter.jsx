import '../assets/stylesheets/CreateCharacter.css';
import { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database'

export default function CreateCharacter ({ setHasChar, playerId, playerRef }) {
  const [char, setChar] = useState({
    name: '',
    pronouns: '',
    sprite: 'russia'
  })
  // const [name, setName] = useState('');
  // const [pronouns, setPronouns] = useState('');

  function handleTextChange (e) {
    setChar((prev) => {
      //!Sanitize text
      const newText = e.target.value.toUpperCase()
      const newState = {...prev, [e.target.id]: newText};

      return newState;
    });
  }

  function handleSubmit () {
    const uid = playerId.current;
    const uref = playerRef.current;
    const { name, pronouns, sprite} = char;
    if (name.length > 1) {
      const newCharacter = {
        id: uid,
        direction: 0,
        name,
        pronouns: pronouns.length > 1 ? pronouns : 'they/them',
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
      {/* <div id='sprite-preview'></div> */}
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
          <input
            type='text'
            className='modal-form-input'
            id='pronouns' value={char.pronouns}
            placeholder={'My pronouns...'}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <button className='done' onClick={handleSubmit}>
        DONE
      </button>
    </div>
  )
}