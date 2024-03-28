import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Switch from "react-switch";
import { useUser } from "../../context/userContext";
import "./signinSignup.css";

export default function LoginForm() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  let statusComponent = null;
  const [userStatus, setUserStatus] = useState(null);
  const [isClient, setIsClient] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSwitch = (nextChecked) => {
    setIsClient(nextChecked);
  };
  const onSuccess = (data) => {
    if (data.message !== "Logged in") {
      setUserStatus(
        <div style={{ color: "red" }}>Your email or password is incorrect!</div>
      );
    } else {
      setUser(null);
      navigate("/");
    }
  };

  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/sign-in",
    onSuccess
  );

  if (isLoading) {
    statusComponent = null;
    statusComponent = <div>Logging in...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorPassword("Please enter both email and password.");
      return;
    }

    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters long.");
      return;
    }

    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        isClient,
      }),
    });
  };

  return (
    <div className="sign-in-form-container">
      <form onSubmit={handleSubmit}>
        <div className="sign-in-form-grid">
          <div className="sign-in-form">
            <div className="form-input-container">
              <div className="toggle-container">
                <label>
                  <div>Driver</div>
                  <Switch
                    onChange={handleSwitch}
                    checked={isClient}
                    onColor="#FFE5B4"
                    onHandleColor="#FFBF00"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                  />
                  <div>Client</div>
                </label>
              </div>
              <label>Email:</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorPassword(null);
                  setUserStatus(null);
                }}
              />
            </div>
            <div className="form-input-container">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword(null);
                  setUserStatus(null);
                }}
              />
            </div>
            <br />
            {errorPassword && (
              <div style={{ color: "red" }}>{errorPassword}</div>
            )}
            {statusComponent}
            {userStatus}
            <div className="form-input-button">
              <button type="submit">Sign In</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
