import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useUser } from "../../context/userContext";
import NotAuthorized from "../../components/NotAuthorized/NotAuthorized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCheck,
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Popup/Modal";

const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const check = <FontAwesomeIcon icon={faCheck} />;
const xMark = <FontAwesomeIcon icon={faXmark} />;
const link = <FontAwesomeIcon icon={faArrowUpRightFromSquare} />;

const DriverHistory = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showModalAccept, setShowModalAccept] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [expandedItem, setExpandedItem] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
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

  if (!user?.role === "driver") {
    return (
      <NotAuthorized message="You are not authorized to view this page. Please Login to view this page." />
    );
  }

  const onSuccess = (data) => {
    const reversedDeliveries = [...data].reverse();
    setDeliveries(reversedDeliveries);
  };

  const onSuccessByStatus = (data) => {
    setDeliveries([]);
    const reversedDeliveries = [...data].reverse();
    setDeliveries(reversedDeliveries);
  };

  const { error, performFetch: performFetchAll } = useFetch(
    `/delivery?driver=${user?._id}`,
    onSuccess
  );

  const { error: erroByStatus, performFetch: performFetchByStatus } = useFetch(
    `/delivery?driver=${user?._id}&status=${selectedStatus}`,
    onSuccessByStatus
  );

  const { error: errorPatch, performFetch: performFetchPatch } = useFetch(
    `/delivery?id=${deliveryId}`,
    () => {
      setShowModalAccept(false);
      setShowModalReject(false);
      window.location.href = "/driver-history";
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const totalItmes = deliveries.length;
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

  const toggleExpand = (index, id) => {
    setDeliveryId(id);
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const handleAccept = () => {
    setShowModalAccept(true);
  };

  const handleReject = () => {
    setShowModalReject(true);
  };

  const onModalAcceptStatus = () => {
    performFetchPatch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: "Accepted",
      }),
    });
  };
  const onModalRejectStatus = () => {
    performFetchPatch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: "Rejected",
      }),
    });
  };

  const onModalReject = () => {
    setShowModalReject(false);
    setShowModalAccept(false);
  };

  useEffect(() => {
    setExpandedItem(null);
  }, [currentPage]);

  useEffect(() => {
    setExpandedItem(null);
    if (selectedStatus.includes("All")) {
      performFetchAll();
    } else {
      performFetchByStatus();
    }
  }, [selectedStatus]);

  const handleOnChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <>
      <Nav />
      {showModalAccept && (
        <Modal
          onAccept={onModalAcceptStatus}
          onReject={onModalReject}
          title={"Accept Delivery"}
          message={"Are you sure to accept this delivery?"}
        />
      )}
      {showModalReject && (
        <Modal
          onAccept={onModalRejectStatus}
          onReject={onModalReject}
          title={"Reject Delivery"}
          message={"Are you sure to reject this delivery?"}
        />
      )}
      <div className="history-all">
        <div className="history-section-container">
          <div className="welcome-message">
            <h4>
              Welcome <span className="user-name">{user?.firstname}</span>, here
              is your delivery history.
            </h4>
          </div>
          <div className="history-items-container">
            <div className="w-full  rounded-t-xl flex h-10 justify-between">
              <label className="available-btn w-1/2">
                <input
                  type="radio"
                  value={"Pending"}
                  name="available"
                  checked={selectedStatus === "Pending"}
                  onChange={handleOnChange}
                />
                <div className="available-details h-12 rounded-tr-none rounded-tl-xl flex justify-center">
                  <span className="text-sm">Available deliveries</span>
                </div>
              </label>
              <label className="available-btn w-1/2 ">
                <input
                  type="radio"
                  value={"All"}
                  name="available"
                  checked={selectedStatus === "All"}
                  onChange={handleOnChange}
                />

                <div className="available-details h-12 rounded-tl-none rounded-tr-xl flex justify-center  ">
                  <span className="text-sm">Delivery history</span>
                </div>
              </label>
            </div>

            <div className="history-items-with-btns flex flex-col justify-between">
              {error || (erroByStatus && <p>Error: {error.message}</p>)}
              {errorPatch || (errorPatch && <p>Error: {errorPatch.message}</p>)}

              <div className="delivery-items-container">
                {currentItems.map((delivery, index) => (
                  <div
                    onClick={() => toggleExpand(index, delivery._id)}
                    className={`delivery ${
                      expandedItem === index ? "deliveryHeight" : ""
                    }`}
                    key={index}
                  >
                    <div className="delviry-heading">
                      <p className="H-address">
                        From <span>{delivery.pickup.city}</span> to{" "}
                        <span>{delivery.dropoff.city}</span>
                      </p>

                      <div>
                        {delivery.status === "Pending" ? (
                          <>
                            <div className="flex justify-between text-center w-18 sm:w-20 items-center">
                              <div
                                className="hover:bg-green-400 h-7 w-7  bg-green-500 rounded-full text-lg flex items-center justify-center mr-2"
                                onClick={() => {
                                  handleAccept();
                                }}
                              >
                                <span>{check}</span>
                              </div>
                              <div
                                className="hover:bg-red-400 h-7 w-7 bg-red-500 rounded-full text-lg flex items-center justify-center"
                                onClick={() => {
                                  handleReject();
                                }}
                              >
                                {xMark}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div>
                            <p
                              className={`text-center history-delivery-status ${
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
                        )}
                      </div>
                    </div>

                    <div className="history-delivery-details">
                      <div className="flex justify-between items-center">
                        Delivery ID #{delivery._id}{" "}
                      </div>

                      <div className="dliv-details">
                        <div className="H-D-item">
                          <img
                            src={getDeliveryImage(delivery.weight)}
                            alt="Delivery Image"
                          />
                        </div>

                        <div className="H-D-item">
                          <p>Client</p>
                          <p>
                            {delivery.client?.firstname}
                            <br></br>
                            {delivery.client?.lastname}
                          </p>
                        </div>
                        <div className="H-D-item">
                          <p>Cost</p>
                          <p>{delivery.cost}</p>
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

                        <div
                          className="text-lg hover:text-gray-500"
                          onClick={() => {
                            navigate(`/delivery-details/${delivery._id}`);
                          }}
                        >
                          {link}
                        </div>
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
    </>
  );
};

export default DriverHistory;
