import React from "react";
import { useNavigate } from "react-router-dom";
import "./signinSignup.css";
export default function SignUpText() {
  const navigate = useNavigate();
  function handleOnclick() {
    navigate("/sign-up");
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
        <p>Create an account</p>
        <span>&#8594;</span>
      </div>
    </div>
  );
}
