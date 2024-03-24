import React,{useEffect} from "react";
import history from "utils/history";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
//
import Home from "pages/Home";
import Login from "pages/Login";
import Products from "pages/Products";
import ProductDetails from "pages/ProductDetails";
import Composition from "pages/Composition";
import NotFound from "pages/NotFound"
//
import useLogout from "hooks/useLogout";

const RoutesMain = () => {

  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const logout = useLogout()

  useEffect(() => {
    if (jwt && location.pathname.includes("/auth")) {
      history.push("/");
      window.location.reload()
    }
    if (!jwt && !location.pathname.includes("/auth")) {
      logout()
    }
  }, [jwt, location.pathname]);
  

  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/details" element={<ProductDetails />} />
        <Route exact path="/compositions" element={<Composition />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />}/>
      </Routes>
  
  );
};

export default RoutesMain;
