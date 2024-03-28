import React from "react";
import Nav from "../../components/Nav/Nav";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
const right = <FontAwesomeIcon icon={faArrowRight} />;

const LandingPage = () => {
  const { user } = useUser();
  if (user?._id) {
    return <HomePage />;
  }
  return (
    <>
      <Nav />

      <div className="home-container">
        <div className="home-message">
          <h3>Deliver your packages with us</h3>
          <h1 className="landing-message">
            THE BEST <span>DELIVERY</span> APPLICATION IN THE WORLD
          </h1>
          <div className="login-signup-btns-container">
            <button>
              <Link to={"/sign-in"}>
                Login <span> {right}</span>
              </Link>
            </button>
            <button>
              <Link to={"/sign-up"}>
                Create an account <span>{right}</span>
              </Link>
            </button>
          </div>
        </div>
        <div className="home-image-div">
          <div className="btns-container"></div>
        </div>
      </div>
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default LandingPage;
