import "../assets/stylesheets/CreateCharacter.css";
import { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { auth } from "../firebase.js";
import { updateProfile } from "firebase/auth";
import { sanitized } from "../helpers.js";
import SpriteSelector from "./SpriteSelector.jsx";
import { spriteFileNames } from "../helpers.js";

export default function CreateCharacter({
  setHasChar,
  playerId,
  playerRef,
  players,
}) {
  const [char, setChar] = useState({
    name: "",
    p1: "",
    p2: "",
  });
  const [pos, setPos] = useState(0);

  function handleTextChange(e) {
    const newText = e.target.value;
    if (!sanitized(newText)) {
      console.error("Bad input!");
      return;
    }
    setChar((prev) => {
      const newState = { ...prev, [e.target.id]: newText };
      return newState;
    });
  }

  async function handleSubmit() {
    const uid = playerId.current;
    const uref = playerRef.current;
    const { name, p1, p2 } = char;
    const sprite = spriteFileNames[pos];
    const pronouns = p1 + "/" + p2;
    if (name.length > 1 && sanitized(name)) {
      const newCharacter = {
        uid: uid,
        direction: 0,
        name,
        pronouns: pronouns.length > 1 ? pronouns : "They/Them",
        online: true,
        sprite,
        x: -5,
        y: -4,
      };
      await set(uref, newCharacter);
      await updateProfile(auth.currentUser, { displayName: name });
      setHasChar(true);
    } else {
      console.log("invalid");
    }
  }

  useEffect(() => {
    const { uid, displayName } = auth.currentUser;
    const player = players[uid];
    if (displayName && player && player.name) {
      setHasChar(true);
    }
  }, [players]);

  return (
    <div id="create-char-wrapper">
      <div id="create-char">
        {/* <h2 className='modal-header'>CREATE YOUR CHARACTER</h2> */}
        <input
          type="text"
          className="name-input"
          id="name"
          value={char.name}
          placeholder={"NAME"}
          onChange={handleTextChange}
        />
        {/* <div className='name-sprite-container'> */}

        <SpriteSelector pos={pos} setPos={setPos} />
        {/* </div> */}
        {/* <div className='modal-fields-container'>
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
        </div> */}
        <button className="done" onClick={handleSubmit}>
          DONE
        </button>
      </div>
    </div>
  );
}
