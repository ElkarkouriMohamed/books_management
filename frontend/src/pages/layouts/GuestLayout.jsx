import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GuestLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 lg:px-5">
        <Link to="/" className="text-2xl" onClick={() => setOpen(false)}>
          Books Management
        </Link>
        <div
          className={`absolute ${
            open ? `top-[64px] opacity-100` : `top-[-100%] opacity-0`
          } ml:opacity-100 left-0 ml:static w-full ml:w-auto transition-all duration-700 max-ml:py-8 bg-[#f9f9f9] ml:bg-white flex flex-col ml:flex-row items-center gap-4 ml:gap-4.5 z-10`}
        >
          <Link
            to="/about"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
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
