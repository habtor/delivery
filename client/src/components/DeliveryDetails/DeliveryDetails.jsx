import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import Steper from "../Steper/Steper";
import PropTypes from "prop-types";
import Modal from "../Popup/Modal";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import "./deliveryDetails.css";

export default function DeliveryDetails({ id }) {
  const { user } = useUser();
  const [driverName, setDriverName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [delivery, setDelivery] = useState(null);
  const steps = ["Pending", "Accepted", "Delivered"];
  const [currentStepNumber, setCurrentStepNumber] = useState(0);
  const [diableReceivedtBtn, setDiableReceivedBtn] = useState(true);
  const [showModalAccept, setShowModalAccept] = useState(false);
  const [deliveryId, setDeliveryId] = useState(null);
  const navigate = useNavigate();

  const onSuccess = (data) => {
    setDriverId(data?.driver);
    setDelivery(data);
    setDeliveryId(data?._id);
    setDiableReceivedBtn(data.status === "Accepted" ? false : true);
    steps.forEach((step, index) => {
      if (step === data.status) {
        setCurrentStepNumber(index + 2);
      }
    });
  };

  const onSuccessDriver = (data) => {
    setDriverName(data?.firstname);
  };

  const { isLoading, error, performFetch } = useFetch(
    `/delivery?deliveryId=${id}`,
    onSuccess
  );

  const {
    isLoading: isLoadingDriver,
    error: errorDriver,
    performFetch: performFetchDriver,
  } = useFetch(`/driver?id=${driverId}`, onSuccessDriver);

  useEffect(() => {
    performFetch();
  }, [delivery?._id]);

  useEffect(() => {
    performFetchDriver();
  }, [driverId]);

  const onModalReject = () => {
    setShowModalAccept(false);
  };

  const { error: errorPatch, performFetch: performFetchPatch } = useFetch(
    `/delivery?id=${deliveryId}`,
    () => {
      setShowModalAccept(false);
      window.location.href = `/delivery-details/${deliveryId}`;
    }
  );
  const handleDriverClick = () => {
    navigate(`/driver-profile/${driverId}`);
  };

  const onModalAcceptStatus = () => {
    performFetchPatch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: "Delivered",
      }),
    });
  };

  const handleReceiveDelivery = () => {
    setShowModalAccept(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || errorPatch) {
    return <div>Something went wrong showing the dirvers</div>;
  }

  if (isLoadingDriver) {
    return <div>Loading...</div>;
  } else if (errorDriver) {
    return <div>Something went wrong showing the dirvers</div>;
  }

  return (
    <>
      {showModalAccept && (
        <Modal
          onAccept={onModalAcceptStatus}
          onReject={onModalReject}
          title={"Receive Delivery"}
          message={
            "Are you sure to set this delivery as delivered? If you didn't receive the delivery yet, please click `No` button."
          }
        />
      )}
      <div className="delivery-container">
        <div className="step-title">
          <p>Delivery tracking</p>
        </div>

        <div className="delivery-items">
          <div className="delivery-details">
            <div className="steper-div">
              <Steper
                totalSteps={steps.length}
                currentStep={currentStepNumber}
                steps={steps}
              />
            </div>
            <div className="tracking-container">
              <div className="text-s mt-12">
                <span className="font-semibold">FROM :</span>{" "}
                <span className="italic ">
                  {`${delivery?.pickup.street} ${delivery?.pickup.number}, ${
                    delivery?.pickup.zipcode &&
                    (delivery?.pickup.zipcode).toUpperCase()
                  }, ${delivery?.pickup.city}`}
                </span>{" "}
                <br />
                <span className="font-semibold">TO :</span>{" "}
                <span className="italic">
                  {`${delivery?.dropoff.street} ${delivery?.dropoff.number}, ${
                    delivery?.dropoff.zipcode &&
                    (delivery?.dropoff.zipcode).toUpperCase()
                  }, ${delivery?.dropoff.city}`}
                </span>
              </div>
              <div className="mt-3 text-xs">
                Delivery ID #{" "}
                <span className="font-medium">{delivery?._id}</span>
              </div>
              <hr className="mt-6" />
              <div className="text-xs my-6 flex justify-between justify-items-center text-center">
                <div>
                  <h6 className="font-medium">Customer</h6>
                  <p>
                    {user?.firstname} {user?.lastname}
                  </p>
                </div>
                <div className="font-medium">
                  <h6>Price</h6>
                  <p>{delivery?.cost && `€${(delivery?.cost).toFixed(2)}`}</p>
                </div>
                <div className="font-medium">
                  <h6>Weight</h6>
                  <p>{delivery?.weight}</p>
                </div>
                <div className="font-medium">
                  <h6>Distance</h6>
                  <p>
                    {delivery?.distance &&
                      `${(delivery?.distance).toFixed(0)} km`}
                  </p>
                </div>
              </div>
              <hr />
              <div className="text-xs my-6">
                <p className="font-medium">Description:</p>
                <p>{delivery?.description}</p>
              </div>
              <hr />
              <div
                onClick={handleDriverClick}
                className="flex  justify-center justify-items-center my-6"
              >
                <img src="https://svgur.com/i/131J.svg" alt="avatar" />
                <div className="ml-3 text-xs flex flex-col justify-center justify-items-center">
                  <p className="font-medium">{driverName}</p>
                  <h6>Driver</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rating
          user={user}
          driverId={driverId}
          deliveryId={deliveryId}
          delivery={delivery}
        />
        {delivery?.status === "Accepted" && user?.role === "client" && (
          <button
            onClick={handleReceiveDelivery}
            className={diableReceivedtBtn ? "disabled" : "enabled"}
          >
            Received
          </button>
        )}
      </div>
    </>
  );
}

DeliveryDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
