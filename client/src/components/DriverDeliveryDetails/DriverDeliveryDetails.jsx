import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import Steper from "./Steper";
import PropTypes from "prop-types";
import "../DeliveryDetails/deliveryDetails.css";

export default function DeliveryDetails({ id }) {
  const { user } = useUser();
  const [driverName, setDriverName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [delivery, setDelivery] = useState(null);
  const steps = ["Pending", "Accepted", "Fulfilled"];
  const [currentStepNumber, setCurrentStepNumber] = useState(0);

  const onSuccess = (data) => {
    setDriverId(data?.driver);
    setDelivery(data);
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

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Something went wrong showing the dirvers</div>;
  }

  if (isLoadingDriver) {
    return <div>Loading...</div>;
  } else if (errorDriver) {
    return <div>Something went wrong showing the dirvers</div>;
  }

  return (
    <>
      <div className="delivery-container">
        <div className="step-title">
          <p>Delivery Details</p>
        </div>
        <Steper
          totalSteps={steps.length}
          currentStep={currentStepNumber}
          steps={steps}
        />

        <div className="delivery-items">
          <div className="delivery-details">
            <div>
              Delivery from <span>{delivery?.pickup.city}</span> to{" "}
              <span>{delivery?.dropoff.city}</span>
            </div>
            <div>Delivery ID #{delivery?._id}</div>
            <hr />
            <div>
              <div>
                <h6>Customer</h6>
                <p>
                  {user?.firstname} {user?.lastname}
                </p>
              </div>
              <div>
                <h6>Price</h6>
                <p>€{delivery?.cost}</p>
              </div>
              <div>
                <h6>Weight</h6>
                <p>{delivery?.weight}</p>
              </div>
              <div>
                <h6>Distance</h6>
                <p>{delivery?.distance}</p>
              </div>
            </div>
            <hr />

            <div>
              <img src="https://svgur.com/i/131J.svg" alt="avatar" />
              <div>
                <p>{driverName}</p>
                <h6>Driver</h6>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

DeliveryDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Validate the id prop
};
