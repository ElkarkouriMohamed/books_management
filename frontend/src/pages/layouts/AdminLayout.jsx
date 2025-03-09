import { Link, Outlet } from "react-router-dom";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const user = useSelector((state) => state.auth.user);
  const { name } = user;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('user:', user);
  }, [user])

  return (
    <>
      <header className="w-full flex justify-between items-center p-4 lg:px-5">
        <Link to="/" className="text-2xl" onClick={() => setOpen(!open)}>
          Books Management
        </Link>
        <div
          className={`absolute ${
            open ? `top-[64px] opacity-100` : `top-[-100%] opacity-0`
          } lg:opacity-100 left-0 lg:static w-full lg:w-auto transition-all duration-700 max-lg:py-8 bg-[#eee] lg:bg-white flex flex-col lg:flex-row items-center gap-6 lg:gap-4.5 xl:gap-8 z-10`}
        >
          <Link
            to="/dashboard"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            Users
          </Link>
          <Link
            to="/borrowings-validate"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            Borrowings
          </Link>
          <Link
            to="/categories"
            className="text-lg hover:text-slate-400 transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            Categories
          </Link>
          <Link
            to="/profile"
            className="bg-amber-300 hover:bg-amber-200 transition-colors duration-200 px-4 py-1.5 rounded-3xl text-lg"
            onClick={() => setOpen(!open)}
          >
            {name}
          </Link>
          <Logout />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden cursor-pointer flex flex-col gap-1.5"
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

{
  /* <img src={open ? close : menu}  className="w-10 h-10" /> */
}
