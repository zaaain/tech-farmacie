import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { imgUrl , imgPath} from "helpers/path";
import useLogout from "hooks/useLogout";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout()
  const {profileData} = useSelector((state)=> state.auth)

  return (
    <div className="py-5 w-full">
      <img
        className="rounded-full mx-auto pb-3 w-[120] h-[120px]"
        draggable={false}
        src={profileData && profileData.avatar ? `${imgPath}${profileData.avatar}` : imgUrl + "/kisan.png"}
        alt="avatar"
      />
      <hr />
      <div className="pt-5 pl-5 leading-10">
        <p
        onClick={()=>navigate("/")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/" ? "text-primary" : ""
          }`}
        >
          Home
        </p>
        <p
        onClick={()=>navigate("/products")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/products" ? "text-primary" : ""
          }`}
        >
          Products
        </p>
        {/* <p
        onClick={()=>navigate("/compositions")}
          className={`font-Roboto text-[20px] hover:text-primary hover:cursor-pointer ${
            location.pathname === "/compositions" ? "text-primary" : ""
          }`}
        >
          Compositions
        </p> */}
        <p className="font-Roboto text-[20px] hover:text-primary cursor-pointe" onClick={logout}>
          Log Out
        </p>
      </div>
    </div>
  );
};

export default Sidebar;