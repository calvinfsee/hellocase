import '../assets/stylesheets/SignIn.css';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '../firebase.js';

export default function SignIn () {
  function signInWithGoogle () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <button id="sign-in" onClick={signInWithGoogle}>Sign In</button>
  )
}