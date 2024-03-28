import React from "react";
import LoginForm from "./LoginForm";
import Nav from "../../components/Nav/Nav";
import SignUpText from "./SignUpText";
import NotAuthorized from "../../components/NotAuthorized/NotAuthorized";
import "./signinSignup.css";
import { useUser } from "../../context/userContext";

export default function LoginPage() {
  const { user } = useUser();

  if (user?._id) {
    return <NotAuthorized message="You are already logged in!" />;
  }

  return (
    <>
      <Nav />
      <div className="sign-up-container">
        <img
          className="sign-up-img"
          src="https://i.ibb.co/2341mXb/packaging-man.png"
          alt="packaging-man"
        />
        <LoginForm />
        <SignUpText />
      </div>
    </>
  );
}
