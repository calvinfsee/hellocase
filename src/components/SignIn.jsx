import '../assets/stylesheets/SignIn.css';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '../firebase.js';

export default function SignIn () {
  function signInWithGoogle () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <div id='sign-in-container'>
      <button id='sign-in' onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}