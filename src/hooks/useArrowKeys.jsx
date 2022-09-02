import { useRef, useState, useEffect } from 'react';

export default function useArrowKeys ( setCount, setOtherCount, obj ) {
  const leftSafe = useRef(true);
  const rightSafe = useRef(true);
  const upSafe = useRef(true);
  const downSafe = useRef(true);

  function leftArrow () {
    if (leftSafe.current) {
      setCount((prev) => prev + 1);
      leftSafe.current = false;
    }
  }
  function rightArrow () {
    if (rightSafe.current) {
      setOtherCount((prev) => prev + 1);
      rightSafe.current = false;
    }
  }

  function keyDown (event) {
    switch (event.code) {
      case "ArrowLeft":
        leftArrow();
        break;
      case "ArrowRight":
        rightArrow();
        break;
      case "ArrowUp":
        if (upSafe.current) {
          console.log(obj.current);
          upSafe.current = false
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
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    setTimeout(() => {
      obj.current = "23582358";
    }, 2000);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  }, []);
}