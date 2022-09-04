import '../assets/stylesheets/CreateCharacter.css';
import { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database'

export default function CreateCharacter ({ setHasChar, playerId, playerRef }) {
  const [char, setChar] = useState({
    name: '',
    pronouns: '',
    sprite: 'russia'
  })
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');

  function handleTextChange (e) {
    setName(e.target.value);
  }

  function handleSubmit () {
    const uid = playerId.current;
    const uref = playerRef.current;
    if (name.length > 1) {
      set(uref, {
        id: uid,
        name,
        direction: 0,
        x: -5,
        y: -4
      });
      setHasChar(true);
    } else {
      console.log('invalid');
    }
  }

  return (
    <div id='create-char'>
      <h2 className='modal-header'>CREATE YOUR CHARACTER</h2>
      {/* <div id='sprite-preview'></div> */}
      <div className=''
      <div className='modal-field'>
        <h3 className='modal-form-label'>NAME:</h3>
        <input
          type='text'
          className='modal-form-input'
          id='name-form' value={name}
          placeholder={'My name...'}
          onChange={handleTextChange}
        />
      </div>
      <div className='modal-field'>
        <h3 className='modal-form-label'>NAME:</h3>
        <input
          type='text'
          className='modal-form-input'
          id='name-form' value={name}
          placeholder={'My name...'}
          onChange={handleTextChange}
        />
      </div>
      <button className='done' onClick={handleSubmit}>
        DONE
      </button>
    </div>
  )
}