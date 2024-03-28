import React from "react";
import { useNavigate } from "react-router-dom";
import "../Login/signinSignup.css";
export default function SignInText() {
  const navigate = useNavigate();
  function handleOnclick() {
    navigate("/sign-in");
  }

  return (
    <div className="sign-up-page-sign-in-text">
      <h4>Deliver your packages with us</h4>
      <br />
      <p>
        THE BEST <span>DELIVERY</span>
        <br /> APPLICATION IN THE <br />
        WORLD
      </p>
      <br />
      <br />
      <div onClick={handleOnclick}>
        <p className="sign-up-page-login-btn">Login</p>
        <span>&#8594;</span>
      </div>
    </div>
  );
}
