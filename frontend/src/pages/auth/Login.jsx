import { useDispatch } from "react-redux";
import { api } from "../../api"
import { setToken, setUser } from "../../features/auth/authSlice";
import { useState } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);

    const handleLogin = async () => {
        try {
            const res = await api.post('api/login', {
                "email": "yassine@gmail.com",
                "password": "4444"
            });
            const data = res.data;
            dispatch(setUser(data.user));
            dispatch(setToken(data.token));
            localStorage.setItem('token', data.token);
            console.log(data);
        } catch (err) {
            setErrors(err);
        }
    }
    return (
        <div>
            <div>
                <label>email</label>
                <input type="text" name='email' />
            </div>
            <div>
                <label>password</label>
                <input type="password" name='password' />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}