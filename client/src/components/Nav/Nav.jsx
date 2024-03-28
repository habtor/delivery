import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Available from "../SetAvailableButton/Available";
import Avatar from "./Avatar";

const Nav = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, [cancelFetch]);

  const onSuccess = () => {
    setUser(null);
    navigate("/");
  };

  const { performFetch, cancelFetch } = useFetch("/sign-out", onSuccess);

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("nav-menu hidden");
  const [isMenuClicked, setisMenuClicked] = useState(false);

  const handelMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("nav-menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("nav-menu hidden");
    }
    setisMenuClicked(!isMenuClicked);
  };

  const handleLogout = async () => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  return (
    <>
      <div className="nav">
        <h3>
          <i className="cursor-pointer" onClick={() => navigate("/")}>
            DELIVERY
          </i>
        </h3>
        <div className="nav-links-div">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>

        {!user?._id ? (
          <>
            <Link to={"/sign-in"}>
              <button className="login-logout-btn">LOGIN</button>
            </Link>
          </>
        ) : (
          <>
            {" "}
            {user.role === "driver" ? (
              <Link to={`/driver-profile/${user._id}`}>
                <Avatar />
              </Link>
            ) : (
              <Link to={`/client-profile/${user._id}`}>
                <Avatar />
              </Link>
            )}
            <Available />
            <button className="login-logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}

        <div className="hamburger-menu" onClick={handelMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </div>
      <div className="burger-container">
        <div className={menuClass}>
          <p className="nav-welcome-msg">
            Welcome{" "}
            <span className="user-name">
              <i>{user?.firstname}</i>
            </span>
          </p>
          <div className="nav-menu-seprator"></div>
          <ul>
            <Link to={"/sign-in"}>
              {!user?._id && <li className="nav-links">LOGIN</li>}
            </Link>
            {user?._id && (
              <li className="nav-links" onClick={handleLogout}>
                Logout
              </li>
            )}

            <li className="nav-links" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="nav-links">About us</li>
            <li className="nav-links">Contact us</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
