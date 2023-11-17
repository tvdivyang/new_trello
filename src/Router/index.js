import React from "react";
import Login from "../Page/Login";
import { Route, Routes } from "react-router";
import Register from "../Page/Register";
import Home from "../Page/Home";
import PrivateRouter from "../Page/PrivatRouter";
import Trello from "../Page/Trello";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<PrivateRouter />} >
          <Route path="/home" element={<Home />}></Route>
          <Route path="/trello" element={<Trello />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
