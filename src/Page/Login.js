import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../Redux/Actions/LoginAction";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { validateLogin } from "../Validation";
import { useSelector } from "react-redux";
// import axios from 'axios'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const mystate = useSelector((state)=>state.register.loginData)
  const [token,settoken] = useState(localStorage.getItem("token"));
  const [inpval, setinpval] = useState({
    email: "eve.holt@reqres.in",
    password: "pistol",
  });
  const [errors, setErrors] = useState("");
  const handleChange = (name, value) => {
    setinpval({ ...inpval, [name]: value });
    setErrors({ ...errors, [name]: null });
  };
  const handlesubmit = () => {
    let formErrors = validateLogin(inpval);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      dispatch(loginApi(inpval));
    }
  };
  useEffect(() => {
    settoken(localStorage.getItem("token"))
    if (token) {
      navigate("/home");
    }
  }, [navigate, token,mystate]);
  return (
    <div>
      <div>
        <form className="container align-items-center d-flex flex-column">
          <h4 className="m-5 text-center"> Login Form</h4>
          <h4 className="text-center text-success "> </h4>
          <div className="mb-3 w-50">
            <label htmlFor="exampleI1" className="form-label">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={inpval.email}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form-control mb-3"
              id="exampleI1"
            />
            <p className="text-danger">{errors.email}</p>
            <label htmlFor="exampleI2" className="form-label">
              Enter Your Password
            </label>
            <input
              type="password"
              name="password"
              value={inpval.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="Enter Your Password"
              className="form-control mb-3 "
              id="exampleI2"
            />
            <p className="text-danger">{errors.password}</p>
          </div>
          <button
            type="button"
            className="btn btn-lg btn-block mb-3"
            style={{ backgroundColor: "#87d3ec" }}
            onClick={handlesubmit}
          >
            Login
          </button>
          <Link to="/register">Register Page</Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
