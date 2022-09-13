import "../assets/stylesheets/SignOut.css";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase.js";
import { ref, update } from "firebase/database";
import { useCallback } from "react";

export default function SignOut({ setLoading, user }) {
  const handleSignOut = useCallback(() => {
    const uref = ref(database, `players/${user.uid}`);
    update(uref, { online: false });
    signOut(auth);
    setLoading(true);
  }, [auth]);

  return (
    <button id="sign-out" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
