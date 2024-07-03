import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [loginState, setLoginState] = useState("Sign Up");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h1>{loginState}</h1>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-input">
          {loginState === "Sign Up" ? (
            <input type="text" placeholder="Enter Your Name" required />
          ) : (
            <></>
          )}
          <input type="email" placeholder="Enter Your Email" required />
          <input type="password" placeholder="Enter Password" required />
          {loginState === "Sign Up" ? (
            <input type="password" placeholder="Confirm Password" required />
          ) : (
            <></>
          )}
        </div>
        <button>{loginState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-cond">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and Policies</p>
        </div>
        {loginState === "Sign Up" ? (
          <p>Already have an Account. <span onClick={() => setLoginState("Login")}>Login Here</span></p>
        ) : (
          <p>Create a new Account? <span onClick={() => setLoginState("Sign Up")}>Click Here</span></p>
          
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
