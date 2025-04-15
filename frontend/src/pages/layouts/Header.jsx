import { useDispatch, useSelector } from "react-redux";
import MemberLayout from "./MemberLayout";
import AdminLayout from "./AdminLayout";
import GuestLayout from "./GuestLayout";
import { api } from "../../api";
import { setToken, setUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await api.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      dispatch(setUser(null));
      dispatch(setToken(null));
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
      console.log('fetch user')
    }

  }, []);
  useEffect(() => {
    console.log('user:', user)
  }, [user]);

  //if (user?.role === "admin") return <AdminLayout />;
  if (user) return <MemberLayout />;

  return <GuestLayout />;
}
