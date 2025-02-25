import { useDispatch } from "react-redux";
import { api } from "../../api"
import { setToken, setUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import email from "../../asset/icons/email.svg";
import lock from "../../asset/icons/lock.svg";
import user from "../../asset/icons/user.svg";

export default function Register() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({"name": [], "email": [], "password": []});

    const handleRegister = async () => {
        try {
            const res = await api.post('api/register', {
                "name": "yassine",
                "email": "yassine@gmail.com",
                "password": "4444",
                "role": "admin"
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
        <div className="bg-[#eee] low:bg-gray-400 h-[calc(100vh-64px)] low:flex low:items-center low:justify-center">
            <div className="low:w-auto bg-[#eee] p-2 low:p-6 flex flex-col items-center gap-4 low:rounded-3xl">
                <div className="text-4xl font-semibold">Login</div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 rounded-2xl">
                        <label>Your Name</label>
                        <div className="flex items-center gap-2 ps-3 bg-white rounded-md">
                            <img src={user} className="h-6 w-6 text-slate-700"/>
                            <input type="text" name='email' placeholder="Full Name" className="p-3 outline-0"/>
                        </div>
                        {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                    </div>
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
                    <button className="cursor-pointer p-3 bg-fuchsia-800 hover:bg-fuchsia-700 transition-colors duration-200 text-white text-lg font-semibold rounded-xl" onClick={handleRegister}>Create Account</button>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-slate-400">Already Have an Account? </span>
                    <Link to='/login' className="underline font-semibold text-fuchsia-700 hover:text-fuchsia-600 transition-colors duration-200">Login to Account</Link>
                </div>
            </div>
        </div>
    )
}