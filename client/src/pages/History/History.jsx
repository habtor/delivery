import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useUser } from "../../context/userContext";
import NotAuthorized from "../../components/NotAuthorized/NotAuthorized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const link = <FontAwesomeIcon icon={faArrowUpRightFromSquare} />;

const History = () => {
  const { user } = useUser();

  const smallImage =
    "https://res.cloudinary.com/domvgm4cs/image/upload/v1706978252/envelop_mudvft.png";
  const mediumImage =
    "https://res.cloudinary.com/domvgm4cs/image/upload/v1707431805/box_vb1qwv.png";
  const bigImage =
    "https://res.cloudinary.com/domvgm4cs/image/upload/v1707431810/bigbox_zwtlw0.png";

  const getDeliveryImage = (weight) => {
    switch (weight) {
      case "Small":
        return smallImage;
      case "Medium":
        return mediumImage;
      case "Big":
        return bigImage;
    }
  };

  const hideButton = "history-hide-btns";

  if (!user?._id) {
    return (
      <NotAuthorized message="You are not authorized to view this page. Please Login to view this page." />
    );
  }

  const [deliveries, setDeliveries] = useState([]);

  const onSuccess = (data) => {
    const reversedDeliveries = [...data].reverse();
    setDeliveries(reversedDeliveries);
  };

  const { isLoading, error, performFetch } = useFetch(
    `/delivery?client=${user?._id}`,
    onSuccess
  );

  useEffect(() => {
    performFetch();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const totalItmes = deliveries.length;
  const [expandedItems, setExpandedItems] = useState([]);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = deliveries.slice(startIndex, endIndex);

  const clickNextHandel = () => {
    if (endIndex < totalItmes) {
      setCurrentPage(currentPage + 1);
    }
  };

  const clickBackHandel = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isItemExpanded = (index) => expandedItems.includes(index);

  const toggleExpand = (index) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(index)) {
        return prevExpandedItems.filter((item) => item !== index);
      } else {
        return [...prevExpandedItems, index];
      }
    });
  };

  useEffect(() => {
    setExpandedItems([]);
  }, [currentPage]);

  return (
    <>
      <Nav />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="history-all">
          <div className="history-section-container">
            <div className="welcome-message">
              <h4>
                Welcome <span className="user-name">{user?.firstname}</span>,
                here is your delivery history.
              </h4>
            </div>
            <div className="history-items-container">
              <div className="history-title">
                <h4>History</h4>
              </div>
              <div className="history-items-with-btns flex flex-col justify-between">
                <div className="delivery-items-container">
                  {currentItems.map((delivery, index) => (
                    <div
                      onClick={() => toggleExpand(index)}
                      className={`delivery ${
                        isItemExpanded(index) ? "deliveryHeight" : ""
                      }`}
                      key={index}
                    >
                      <div className="delviry-heading">
                        <p className="H-address">
                          From <span>{delivery.pickup.city}</span> to{" "}
                          <span>{delivery.dropoff.city}</span>
                        </p>

                        <p
                          className={`history-delivery-status ${
                            delivery.status === "Delivered"
                              ? "delivered-status"
                              : delivery.status === "Accepted"
                              ? "accepted-status "
                              : ""
                          }`}
                        >
                          {delivery.status}
                        </p>
                      </div>

                      <div className="history-delivery-details">
                        <p>
                          Delivery ID #
                          <span className="font-bold">{delivery._id}</span>
                        </p>
                        <div className="dliv-details">
                          <div className="H-D-item">
                            <img
                              src={getDeliveryImage(delivery.weight)}
                              alt="Delivery Image"
                            />
                          </div>
                          <div className="H-D-item">
                            <p>Driver</p>
                            <p>
                              {delivery.driver?.firstname
                                ? delivery.driver?.firstname
                                : "_"}{" "}
                              {delivery.driver?.lastname}
                            </p>
                          </div>
                          <div className="H-D-item">
                            <p>Cost</p>
                            <p>&euro; {delivery.cost}</p>
                          </div>
                          <div className="H-D-item">
                            <p>Weight</p>
                            <p>{delivery.weight}</p>
                          </div>
                          <div className="H-D-item">
                            <p>Distance</p>
                            <p>{delivery.distance}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-5">
                          <div className="pr-10">
                            <p className="font-bold">Description</p>
                            <p>{delivery.description}</p>
                          </div>
                          <Link to={`/delivery-details/${delivery._id}`}>
                            <div>
                              <span className="hover:text-gray-400 pr-5">
                                {link}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="history-btns">
                  <div className="left-btn history-btn">
                    <button
                      className={`${startIndex === 0 ? hideButton : ""}`}
                      onClick={() => {
                        clickBackHandel();
                      }}
                    >
                      {leftArrow}
                    </button>
                  </div>
                  {currentPage}
                  <div className="history-btn ">
                    <button
                      className={` ${endIndex >= totalItmes ? hideButton : ""}`}
                      onClick={() => {
                        clickNextHandel();
                      }}
                    >
                      {rightArrow}
                    </button>
                  </div>
                </div>
              </div>
              <div className="back-button">
                <Link to={"/"}>
                  <span>{leftArrow}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="history-image-div"></div>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default History;
