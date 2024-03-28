import React from "react";
import SignUpForm from "./SignUpForm";
import Nav from "../../components/Nav/Nav";
import SignInText from "./SignInText";
import "../Login/signinSignup.css";

export default function SignUp() {
  return (
    <>
      <Nav />
      <div className="sign-up-container">
        <img
          className="sign-up-img"
          src="https://i.ibb.co/2341mXb/packaging-man.png"
          alt="packaging-man"
        />

        <SignUpForm />
        <SignInText />
      </div>
    </>
  );
}
