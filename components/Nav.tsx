// This is the navbar component, where we import the Popoverbasket component
// We also use the useItemStore hook to get the reload state.
// We also use the Link component from next/link to link to the landingpage.
// We also use the Toaster component from react-hot-toast to display toasts when adding or removing items from the basket.
// TODO Fix the Login-function

"use client";
import Link from "next/link";
import MyPopover from "./Popoverbasket";
import { Toaster } from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { useItemStore } from "../app/zustand/zustandStore";

const Nav = () => {
  const reload = useItemStore((state) => state.reload);
  const updateReload = useItemStore((state) => state.updateReload);
  return (
    <>
      <nav className="p-4 w-full bg-white border-b border-black flex justify-between items-center fixed z-50">
        <Link
          href="/"
          className="text-xl"
          onClick={() => updateReload(!reload)}
        >
          Hakim Livs
        </Link>
        <div className="flex space-x-6">
          <Link
            href="/"
            className="hover:text-blue-500 flex flex-col items-center"
            onClick={() => updateReload(!reload)}
          >
            <AiOutlineUser className="text-3xl" />
            <p>Logga in</p>
          </Link>
          <div>
            <Toaster />
            <MyPopover />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
