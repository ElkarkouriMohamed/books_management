import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Logout from "./Logout";

export default function MemberLayout() {
  const [open, setOpen] = useState(false);
  const { name } = useSelector((state) => state.auth.user);
  return (
    <>
      <header className="w-full flex justify-between items-center p-4 lg:px-5">
        <Link to="/" className="text-2xl">
          Books Management
        </Link>
        <div
          className={`absolute ${
            open ? `top-[64px] opacity-100` : `top-[-100%] opacity-0`
          } ml:opacity-100 left-0 ml:static w-full ml:w-auto transition-all duration-700 max-ml:py-8 bg-[#f9f9f9] ml:bg-white flex flex-col ml:flex-row items-center gap-4 ml:gap-4.5`}
        >
          <Link
            to="/books"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
          >
            Books
          </Link>
          <Link
            to="/borrowings"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
          >
            My Borrowings
          </Link>
          <Link
            to="/profile"
            className="bg-amber-300 hover:bg-amber-200 transition-colors duration-200 px-4 py-1.5 rounded-3xl text-lg"
          >
            {name}
          </Link>
          <Logout />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="ml:hidden cursor-pointer flex flex-col gap-1.5"
        >
          <motion.span
            className="w-8 h-[3px] bg-slate-800 rounded-lg"
            animate={{ rotate: open ? -45 : 0, y: open ? 9 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          ></motion.span>
          <motion.span
            className="w-8 h-[3px] bg-slate-800 rounded-lg"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          ></motion.span>
          <motion.span
            className="w-8 h-[3px] bg-slate-800 rounded-lg"
            animate={{ rotate: open ? 45 : 0, y: open ? -9 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          ></motion.span>
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
