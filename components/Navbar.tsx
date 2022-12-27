import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAddChart } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { username } = useContext(UserContext);
  const [focus, setfocus] = useState(false);
  const router = useRouter();

  return (
    <section className="fixed bottom-0 w-full h-16 bg-white shadow-[5px_5px_10px_#878787] z-10">
      <ul className="flex justify-between h-full items-center mx-12">
        <Link href={`/${username}`}>
          <BiCategoryAlt
            className={`nav-buttons ${
              router.pathname == "/[username]" ? "text-orange1 opacity-80" : ""
            }`}
          />
        </Link>
        <Link href="/addexpense">
          <MdAddChart
            onClick={() => setfocus(!focus)}
            className={`nav-buttons ${
              router.pathname == "/addexpense" ? "text-orange1 opacity-80" : ""
            }`}
          />
        </Link>
        <Link href={"/summary"}>
          <GoGraph
            className={`nav-buttons ${
              router.pathname == "/summary" ? "text-orange1 opacity-80" : ""
            }`}
          />
        </Link>
      </ul>
    </section>
  );
};

export default Navbar;
