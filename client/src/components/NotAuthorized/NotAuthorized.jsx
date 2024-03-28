import React from "react";
import PropTypes from "prop-types";
import Nav from "../Nav/Nav";
import "./notAuth.css";

const NotAuthorized = ({ message }) => {
  return (
    <>
      <Nav />
      <div className="not-authenticated">
        <img className="not-authenticated-img" />
        <h1>Not Authorized</h1>
        <p className="not-authenticated-p">{message}</p>
      </div>
    </>
  );
};

NotAuthorized.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotAuthorized;
