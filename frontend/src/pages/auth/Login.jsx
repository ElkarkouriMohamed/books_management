import { useDispatch } from "react-redux";
import { api } from "../../api"
import { setToken, setUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import email from "../../asset/icons/email.svg";
import lock from "../../asset/icons/lock.svg";
import { motion } from "framer-motion";


export default function Login() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({"email": [], "password": []});

    const handleLogin = async () => {
        try {
            const res = await api.post('api/login', {
                "email": "simo@gmail.com",
                "password": "4444"
            });
            const data = res.data;
            dispatch(setUser(data.user));
            dispatch(setToken(data.token));
            localStorage.setItem('token', data.token);
            console.log(data);
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    }

    return (
        <div className="low:bg-gray-400 w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <motion.div className="w-fit bg-[#eee] p-6 flex flex-col gap-4 rounded-3xl"
                initial={{ scale:.8 }}
                animate={{ scale:1 }}
                transition={{ duration: .4 }}
            >
                <div className="text-4xl font-semibold text-center">Login</div>
                <div className="flex flex-col gap-4 w-[340px]">
                    <div className="flex flex-col gap-2 rounded-2xl">
                        <label>Email</label>
                        <div className="flex items-center gap-2 ps-3 bg-white rounded-md">
                            <img src={email} className="h-6 w-6 text-slate-700"/>
                            <input type="text" name='email' placeholder="Email Address" className="p-3 outline-0"/>
                        </div>
                        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl">
                        <label>Password</label>
                        <div className="flex items-center gap-2 ps-3 bg-white rounded-md">
                            <img src={lock} className="h-6 w-6 fill-slate-700"/>
                            <input type="password" name='password' placeholder="Enter Password" className="p-3 outline-0"/>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                    </div>
                    <button className="cursor-pointer p-3 bg-fuchsia-800 hover:bg-fuchsia-700 transition-colors duration-200 text-white text-lg font-semibold rounded-xl" onClick={handleLogin}>Login</button>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-slate-400">Don&apos;t have an Account? </span>
                    <Link to='/register' className="underline font-semibold text-fuchsia-700 hover:text-fuchsia-600 transition-colors duration-200">Create Account</Link>
                </div>
            </motion.div>
        </div>
    )
}