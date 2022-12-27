import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/userContext";
import { BudgetsProvider } from "../context/BudgetsContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [userUid, setUserUid] = useState("");
  const [username, setUsername] = useState<string | null>();

  // UseEffect and onAuthStateChanged tracks signIn/SignOut state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        setUsername(user.displayName);
      } else {
        setUserUid("");
        setUsername(null);
      }
    });
  }, [userUid]);

  return (
    <UserContext.Provider value={{ userUid, username }}>
      <BudgetsProvider>
        {userUid && <Navbar />}
        <Component {...pageProps} />
      </BudgetsProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
