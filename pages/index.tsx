import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import SignIn from "../components/SignIn";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (username) {
      router.push(`/${username}`);
    }
  }, [username]);

  return (
    <>
      <Head>
        <title>Expenses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!username && <SignIn />}
    </>
  );
};

export default Home;
