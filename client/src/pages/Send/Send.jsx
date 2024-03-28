import React from "react";
import Nav from "../../components/Nav/Nav";
import { useUser } from "../../context/userContext";
import NotAuthorized from "../../components/NotAuthorized/NotAuthorized";
import SendForm from "../../components/CreateDelivery/SendForm";

const Send = () => {
  const { user } = useUser();
  if (!user?._id) {
    return (
      <NotAuthorized message="You are not authorized to view this page. Please Login to view this page." />
    );
  }

  return (
    <>
      <Nav />
      <div className="history-all">
        <div className="history-section-container">
          <div className="welcome-message">
            <h4>
              Welcome <span className="user-name">{user?.firstname}</span>, here
              is your delivery history.
            </h4>
          </div>
          <SendForm />
        </div>
        <div className="send-image-div"></div>
      </div>
    </>
  );
};

export default Send;
