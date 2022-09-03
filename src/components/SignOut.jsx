import '../assets/stylesheets/SignOut.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useCallback } from 'react';

export default function SignOut ({ setLoading }) {
  const handleSignOut = useCallback(() => {
    signOut(auth);
    setLoading(true);
  }, [auth]);

  return (
    <button id="sign-out" onClick={handleSignOut}>
      Sign Out
    </button>
  )
}