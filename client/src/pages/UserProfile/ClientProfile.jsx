import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { useUser } from "../../context/userContext";
import NotAuthorized from "../../components/NotAuthorized/NotAuthorized";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const link = <FontAwesomeIcon icon={faArrowUpRightFromSquare} />;
export default function ClientProfile() {
  const [driver, setDriver] = useState({});
  const [deliveries, setDeliveries] = useState([]);
  const [errorLoadingComponent, setErrorLoadingComponent] = useState(null);
  const { user } = useUser();
  const { id } = useParams();

  const onSucces = (data) => {
    setDriver(data);
  };

  const { loading, error, performFetch } = useFetch(
    `/client?id=${id}`,
    onSucces
  );

  useEffect(() => {
    performFetch();
  }, []);

  const onSuccesDeliveries = (data) => {
    setDeliveries(data);
  };

  const { performFetch: performFetchDeliveries } = useFetch(
    `/delivery?client=${id}`,

    onSuccesDeliveries
  );

  useEffect(() => {
    performFetchDeliveries();
  }, []);

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

  if (error) {
    return setErrorLoadingComponent(<div>Something went wrong..</div>);
  }

  if (loading) {
    return setErrorLoadingComponent(<div>Loading...</div>);
  }
  if (!user?._id) {
    return (
      <NotAuthorized message="You are not authorized to view this page. Please Login to view this page." />
    );
  }

  return (
    <>
      <Nav />
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
        <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src="https://svgur.com/i/131J.svg"
                  alt="image"
                />
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <a
                      className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                      href=""
                    >
                      {" "}
                      {driver.firstname} {driver.lastname}{" "}
                    </a>
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                      href=""
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>{" "}
                      {driver.city}{" "}
                    </a>
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                      href=""
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M17 1H7c-1.1 0-1.99.9-1.99 2L5 21c0 1.1.89 2 1.99 2H17c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 16H9v-1h6v1zm2-4H7V6h10v9z" />

                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </span>{" "}
                      {driver.phone}{" "}
                    </a>
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                      href=""
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </span>{" "}
                      {driver.email}{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full h-px border-neutral-200" />
          {errorLoadingComponent && errorLoadingComponent}
        </div>
      </div>
      <div className="history-items-container">
        <div className="history-title">
          <h4>Previous Deliveries Of {driver.firstname}</h4>
        </div>
        <div className="history-items-with-btns">
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
                      delivery.status === "Accepted" ? "delivered-status" : ""
                    }`}
                  >
                    {delivery.status}
                  </p>
                </div>

                <div className="history-delivery-details">
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
                        {driver?.firstname ? driver?.firstname : "_"}{" "}
                        {driver?.lastname}
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
                        <span className="hover:text-gray-400 pr-5">{link}</span>
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
      </div>
    </>
  );
}
