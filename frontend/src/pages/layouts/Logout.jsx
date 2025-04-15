import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../features/auth/authSlice";

export default function Logout() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post(
        "api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate('/login');
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <Link
      onClick={() => handleLogout()}
      className="border-2 border-red-400 hover:bg-red-400 text-red-400 hover:text-white px-3 py-1.5 rounded-3xl transition-colors duration-200"
    >
      Logout
    </Link>
  );
}
