import React from "react";
import Nav from "../../components/Nav/Nav";
import AboutUs from "../../components/AboutUs/AboutUs";
import ContactUs from "../../components/ContactUs/ContactUs";
import { Link } from "react-router-dom";

import { useUser } from "../../context/userContext";

const HomePage = () => {
  const { user } = useUser();

  return (
    <>
      <div id="home"></div>
      <Nav />
      <div className="home-container">
        <div className="home-message">
          <h4 className="user-message">
            Welcome{" "}
            <span className="user-name">
              <i>{user?.firstname}</i>
            </span>
            ,
          </h4>
          <h1>
            TO THE BEST <span>DELIVERY</span> APPLICATION IN THE WORLD
          </h1>

          <div className="btns-container-pc">
            {user.role === "client" ? (
              <Link to={"/send"}>
                <button>Send a package</button>
              </Link>
            ) : (
              ""
            )}

            {user.role === "client" ? (
              <Link to={"/history"}>
                <button>Delivery history</button>
              </Link>
            ) : (
              <Link to={"/driver-history"}>
                <button>To deliveries</button>
              </Link>
            )}
          </div>
        </div>

        <div className="home-image-div">
          <div className="btns-container">
            {user.role === "client" ? (
              <Link to={"/send"}>
                <button>Send a package</button>
              </Link>
            ) : (
              ""
            )}
            {user.role === "client" ? (
              <Link to={"/history"}>
                <button>Delivery history</button>
              </Link>
            ) : (
              <Link to={"/driver-history"}>
                <button>To deliveries</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default HomePage;
