//useAuthStatus.js vigila estado de usuario
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// para seguir estado de usuario actual. Estado puede se loggedIn or not.
export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus };
}
