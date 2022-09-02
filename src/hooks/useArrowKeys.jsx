import { useRef, useState, useEffect } from 'react';

export default function useArrowKeys (id) {
  const leftSafe = useRef(true);
  const rightSafe = useRef(true);
  const upSafe = useRef(true);
  const downSafe = useRef(true);

  //Put handleArrowKey functions in the if statement

  function keyDown (event) {
    switch (event.code) {
      case "ArrowLeft":
        if (leftSafe.current) {
          leftSafe.current = false;
        }
        break;
      case "ArrowRight":
        if (rightSafe.current) {
          rightSafe.current = false;
        }
        break;
      case "ArrowUp":
        if (upSafe.current) {
          upSafe.current = false
        }
        break;
      case "ArrowDown":
        if (downSafe.current) {
          downSafe.current = false;
        }
        break;
      default:
        break;
    }
  }
  function keyUp (event) {
    switch (event.code) {
      case "ArrowLeft":
        leftSafe.current = true;
        break;
      case "ArrowRight":
        rightSafe.current = true;
        break;
      case "ArrowUp":
        upSafe.current = true;
        break;
      case "ArrowDown":
        downSafe.current = true;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  }, []);
}