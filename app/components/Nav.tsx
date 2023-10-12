"use client";
import Link from "next/link";
import MyPopover from "./Popoverbasket";

// Navbaren högst upp på första sidan
// TODO: Fixa funktionalitet på login och varukorg

const Nav = () => {
  return (
    <>
      <nav className="p-4 w-full bg-green-200 flex justify-between fixed z-50">
        <h1>Hakim Livs</h1>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Logga in
          </Link>
          <div>
            <MyPopover />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
