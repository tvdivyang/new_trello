import React from "react";
import { Navigate, Outlet } from "react-router";

function PrivateRouter() {
  const Islogin = localStorage.getItem("token");

  if (Islogin) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  }
}

export default PrivateRouter;