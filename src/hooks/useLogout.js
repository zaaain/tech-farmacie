import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/slices/authSlice/authReducer";
import { useNavigate } from "react-router-dom";

const useLogout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAuth());
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  return logout;
};

export default useLogout;
