import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import "../Login/signinSignup.css";

export default function SignUpForm() {
  const [passwordWarning, setPasswordWarning] = useState(null);
  const navigate = useNavigate();
  const [isDriver, setIsdriver] = useState(false);

  const handleSwitch = (nextChecked) => {
    setIsdriver(nextChecked);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    vehicleType: "Car",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    return cancelFetchError;
  }, []);

  const onSuccess = () => {
    navigate("/sign-in");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/client/sign-up",
    onSuccess
  );

  const {
    isLoading: isLoadingDriver,
    error: errorDriver,
    performFetch: performFetchDriver,
    cancelFetch: cancelFetchError,
  } = useFetch("/driver/sign-up", onSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyPassword(formData.password, formData.confirmPassword)) {
      setPasswordWarning(null);
      if (isDriver) {
        performFetchDriver({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phoneNumber,
            city: formData.city,
            role: "driver",
            vehicle: formData.vehicleType,
          }),
        });
      } else {
        performFetch({
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phoneNumber,
            city: formData.city,
            role: "client",
          }),
        });
      }
    } else {
      setPasswordWarning(
        <div>
          Passwords should match and it must be at least 8 characters and
          contain letters and numbers.
        </div>
      );
    }
  };

  function verifyPassword(password, verify) {
    const minLength = 8;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

    return (
      password === verify &&
      password.length >= minLength &&
      passwordRegex.test(password)
    );
  }

  let statusComponent = null;
  if (error) {
    statusComponent = <div>Something went bad...</div>;
  }
  if (isLoading) {
    statusComponent = <div>Creating user....</div>;
  }
  if (errorDriver) {
    statusComponent = <div>Something went bad...</div>;
  }
  if (isLoadingDriver) {
    statusComponent = <div>Creating user....</div>;
  }

  return (
    <div className="sign-up-form-container">
      <form onSubmit={handleSubmit}>
        <div className="sign-up-form">
          <h4>Sign Up</h4>
          <div className="toggle-container">
            <label>
              <div>Client</div>
              <Switch
                onChange={handleSwitch}
                checked={isDriver}
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
              <div>Driver</div>
            </label>
          </div>

          <div className="sign-up-form-grid">
            <div className="form-input-container">
              <label htmlFor="firstName">First Name:*</label>
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="lastName">Last Name:*</label>
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="city">City:*</label>
              <br />
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="email">E-mail:*</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input-container">
              <label htmlFor="password">Password:*</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="confirmPassword">Password Again:*</label>
              <br />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="phoneNumber">Phone Number:*</label>
              <br />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            {isDriver ? (
              <div className="form-input-container">
                <label htmlFor="vehicleType">Vehicle Type:*</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>
              </div>
            ) : null}
          </div>
          <div className="form-input-button">
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
      {passwordWarning}
      {statusComponent}
    </div>
  );
}
