import { useDispatch } from "react-redux";
import { api } from "../../api";
import { setToken, setUser } from "../../features/auth/authSlice";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import email from "../../asset/icons/email.svg";
import lock from "../../asset/icons/lock.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ email: [], password: [] });
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      const res = await api.post("api/login", formData);
      const data = res.data;
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      localStorage.setItem("token", data.token);
      navigate('/');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    setIsVisible(false);
    const id = setTimeout(() => {
      navigate("/register");
    }, 200);
    timeoutRef.current = id;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="auth w-full max-low:bg-[#eee] h-[calc(100vh-64px)] flex items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="low:backdrop-blur-xs max-low:w-full p-4 low:p-6 flex flex-col gap-8 low:gap-4 rounded-3xl low:shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ scale: 0.9, transition: { duration: 0.2 } }}
          >
            <div className="text-4xl font-semibold text-center">Login</div>
            <div className="flex flex-col gap-4 low:w-[340px]">
              <div className="flex flex-col gap-2 rounded-2xl">
                <label>Email</label>
                <div className="flex items-center gap-2 ps-3 bg-white rounded-md">
                  <img src={email} className="h-6 w-6 text-slate-700" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="p-3 outline-0 w-full"
                    onChange={(e) => setFormData((prev) => ({...prev, "email": e.target.value}))}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email[0]}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 rounded-2xl">
                <label>Password</label>
                <div className="flex items-center gap-2 ps-3 bg-white rounded-md">
                  <img src={lock} className="h-6 w-6 fill-slate-700" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="p-3 outline-0 w-full"
                    onChange={(e) => setFormData((prev) => ({...prev, "password": e.target.value}))}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password[0]}</p>
                )}
              </div>
              <button
                className="cursor-pointer p-3 bg-fuchsia-800 hover:bg-fuchsia-700 transition-colors duration-200 text-white text-lg font-semibold rounded-xl"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-slate-400">
                Don&apos;t have an Account?{" "}
              </span>
              <Link
                to="/register"
                onClick={handleNavigate}
                className="underline font-semibold text-fuchsia-700 hover:text-fuchsia-600 transition-colors duration-200"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
