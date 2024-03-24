import React, { useState } from "react";
import useClient from "hooks/useClient";
import LoginForm from "Forms/LoginForm";
import { imgUrl } from "helpers/path";
import AsynStorage from "helpers/asyncLocalStorage";
import useSnackMsg from "hooks/useSnackMsg";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const { api } = useClient();
  const { eSnack } = useSnackMsg();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()


const onSubmit = (val) => {
  setLoader(true)
  api.post("/api/auth/tech/login", val)
  .then((res)=>{
    setLoader(false)
    const response = res.data && res.data.data
    console.log("res", res)
    AsynStorage.setItem("jwt", response.token).then(() => {
      navigate("/");
    })
  })
  .catch((err)=>{
    setLoader(false)
    eSnack(err.message ? err.message : "Sorry something is went weong")
  })
}


  return (
    <div className="flex justify-center items-center min-h-screen min-w-full bg-gradient ">
      <div className="bg-white xs:w-[90%] sm:w-[80%] md:w-[50%]  rounded-2xl p-5">
        <div className="flex justify-between items-center">
          <img
            alt="logo"
            src={imgUrl + "/logo.png"}
            className="w-[200px] h-[60px] object-cover xs:max-w-[150px] xs:max-h-[45px]"
          />
        </div>
        <p className="font-Roboto font-extrabold text-[42px] text-center mt-5 text-primary">
          Sign In
        </p> 
          <LoginForm
            onSubmit={onSubmit}
            loader={loader}
          />
      </div>
    </div>
  );
};

export default Login;
