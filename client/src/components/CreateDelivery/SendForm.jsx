import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Steper from "../Steper/Steper";
import Size from "./Size";
import Description from "./Description";
import Address from "./Address";
import "./CreateDeliveryForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Popup/Modal";
import Payment from "../Payment/Payment";
import Summary from "./Summary";

const right = <FontAwesomeIcon icon={faArrowRight} />;
const leftArrow = <FontAwesomeIcon icon={faArrowLeft} />;
const checkIcone = <FontAwesomeIcon icon={faCheck} />;

const SendForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { user } = useUser();
  const [selectedSize, setSelectedSize] = useState("");
  const [description, setDescription] = useState("");
  const [address] = useState({
    pickup: {},
    dropoff: {},
  });
  const [stepTitle, setStepTitle] = useState("Package details");
  const [rightArrow, setRightArrow] = useState(right);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [isWeightSelected, setIsWeightSelected] = useState(false);
  const [isDescriptionAdded, setIsDescriptionAdded] = useState(false);
  const [hideBtns, setHideBtns] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [modelComponent, setModelComponent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [verifyPickUpAddress, setVerifyPickUpAddress] = useState(null);
  const [verifyDropOffAddress, setVerifyDropOffAddress] = useState(null);
  const [distance, setDistance] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [selectedWeightValue, setSelectedWeightValue] = useState(0);

  const [delivery, setDelivery] = useState({
    client: user?._id,
    pickup: address.pickup,
    dropoff: address.dropoff,
    cost: 0,
    weight: selectedSize,
    distance: 0,
    description: description,
  });

  const weightValue = () => {
    if (selectedSize === "Small") {
      setSelectedWeightValue(2);
    } else if (selectedSize === "Medium") {
      setSelectedWeightValue(4);
    } else {
      setSelectedWeightValue(6);
    }
  };

  const success = () => {
    return (
      <>
        <div className="success-container">
          <div className="success-message">
            {successMessage && <div>{successMessage}</div>}
          </div>
          <div className="success-message-icon">
            <p className="check-icon">{checkIcone}</p>
          </div>
        </div>
      </>
    );
  };

  const onReceived = (data) => {
    setSuccessMessage("Request created successfully");
    setShowSuccess(true);
    setPaymentData(data);
  };

  const { isLoading, error, performFetch } = useFetch("/delivery", onReceived);

  const handleSizeChange = (value) => {
    setSelectedSize(value);
    setDelivery({
      ...delivery,
      weight: value,
    });
    setIsWeightSelected(true);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setDelivery({
      ...delivery,
      description: value,
    });
    setIsDescriptionAdded(true);
  };
  const handlePickupChange = (field, value) => {
    setDelivery({
      ...delivery,
      pickup: {
        ...delivery.pickup,
        [field]: value,
      },
    });
  };

  const handleDropoffChange = (field, value) => {
    setDelivery({
      ...delivery,
      dropoff: {
        ...delivery.dropoff,
        [field]: value,
      },
    });
  };

  const handelNext = () => {
    if (isWeightSelected && isDescriptionAdded && step < 4) {
      setStep(step + 1);
      setStepTitle("Address");
    }
    if (step === 1) {
      setRightArrow(right);
    }
    if (step === 2) {
      setStepTitle("Payment");
      setRightArrow(checkIcone);
    }

    if (
      delivery.pickup &&
      delivery.pickup.firstname &&
      delivery.pickup.lastname &&
      delivery.pickup.city &&
      delivery.pickup.street &&
      delivery.pickup.number &&
      delivery.pickup.zipcode &&
      delivery.dropoff &&
      delivery.dropoff.firstname &&
      delivery.dropoff.lastname &&
      delivery.dropoff.city &&
      delivery.dropoff.street &&
      delivery.dropoff.number &&
      delivery.dropoff.zipcode &&
      delivery.weight &&
      delivery.description &&
      step === 3
    ) {
      setHideBtns(true);
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          client: user?._id,
          pickup: {
            firstname: delivery.pickup.firstname,
            lastname: delivery.pickup.lastname,
            city: delivery.pickup.city,
            street: delivery.pickup.street,
            number: delivery.pickup.number,
            zipcode: delivery.pickup.zipcode,
          },
          dropoff: {
            firstname: delivery.dropoff.firstname,
            lastname: delivery.dropoff.lastname,
            city: delivery.dropoff.city,
            street: delivery.dropoff.street,
            number: delivery.dropoff.number,
            zipcode: delivery.dropoff.zipcode,
          },
          cost: delivery.cost,
          weight: delivery.weight,
          distance: delivery.distance,
          description: delivery.description,
        }),
      });
      setSuccessMessage("Request created successfully");
    }
  };
  const handelBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }

    if (step === 2) {
      setStepTitle("Package details");
    }
    if (step === 3) {
      setStepTitle("Address");
      setRightArrow(right);
    }
  };

  const { performFetch: performCalculate } = useFetch(
    "/calculation",
    (data) => {
      setDistance(data.distance);
    }
  );

  const { performFetch: performPickup } = useFetch("/verify", (data) => {
    setVerifyPickUpAddress(data);
  });

  const { performFetch: performDropOff } = useFetch("/verify", (data) => {
    setVerifyDropOffAddress(data);
  });

  useEffect(() => {
    if (
      !(delivery.pickup.zipcode === "") &&
      !(delivery.pickup.number === 0) &&
      !(delivery.dropoff.zipcode === "") &&
      !(delivery.dropoff.number === 0)
    ) {
      performCalculate({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: delivery.pickup.zipcode,
          to: delivery.dropoff.zipcode,
        }),
      });

      performPickup({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          zipcode: delivery.pickup.zipcode,
          houseNumber: delivery.pickup.number,
        }),
      });

      performDropOff({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          zipcode: delivery.dropoff.zipcode,
          houseNumber: delivery.dropoff.number,
        }),
      });
      weightValue();
    }
  }, [
    delivery.pickup.zipcode,
    delivery.pickup.number,
    delivery.dropoff.zipcode,
    delivery.dropoff.number,
  ]);

  function calculate() {
    if (verifyPickUpAddress?.city && verifyDropOffAddress?.city) {
      delivery.pickup.city = verifyPickUpAddress.city;
      delivery.dropoff.city = verifyDropOffAddress.city;
      delivery.dropoff.street = verifyDropOffAddress.street;
      delivery.pickup.street = verifyPickUpAddress.street;
      delivery.distance = distance;
      const deliveryCost = 10 + (distance * selectedWeightValue) / 5;
      const message = `Your delivery cost is ${deliveryCost.toFixed(
        2
      )} Euro from ${`${delivery?.pickup.street} ${delivery?.pickup.number}, ${
        delivery?.pickup.zipcode && (delivery?.pickup.zipcode).toUpperCase()
      }, ${delivery?.pickup.city}`} to ${`${delivery?.dropoff.street} ${
        delivery?.dropoff.number
      }, ${
        delivery?.dropoff.zipcode && (delivery?.dropoff.zipcode).toUpperCase()
      }, ${delivery?.dropoff.city}`}. Do you want to continue?`;

      setShowModal(true);

      if (deliveryCost) {
        setModelComponent(
          <Modal
            onAccept={() => {
              setShowModal(false);
              delivery.cost = deliveryCost;
              setNextButtonDisabled(false);
            }}
            onReject={() => {
              navigate("/");
            }}
            title={"DELIVERY COST"}
            message={message}
          />
        );
      }
    } else if (!verifyDropOffAddress?.city) {
      setShowModal(true);
      setModelComponent(
        <Modal
          onAccept={() => {
            setShowModal(false);
          }}
          onReject={null}
          title={"DELIVERY COST"}
          message={"Please check the RECEIVER's address!"}
        />
      );
    } else if (!verifyPickUpAddress?.city) {
      setShowModal(true);
      setModelComponent(
        <Modal
          onAccept={() => {
            setShowModal(false);
          }}
          onReject={null}
          title={"DELIVERY COST"}
          message={"Please check the SENDER's address!"}
        />
      );
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="delivery-container">
          <div className="step-title">
            <p>{stepTitle}</p>
          </div>
          <div className="delivery-items">
            <div className="steper-div">
              <Steper currentStep={step} totalSteps={3} />
            </div>
            <div className="steps">
              {step === 1 ? (
                <>
                  <Size
                    selectedSize={selectedSize}
                    onRadioChange={handleSizeChange}
                  />
                  <Description
                    description={description}
                    onDescriptionChange={handleDescriptionChange}
                  />
                  <p className={"required-text"}>
                    <i>* Required field</i>
                  </p>
                </>
              ) : step === 2 ? (
                <>
                  <Address
                    pickup={delivery.pickup}
                    dropoff={delivery.dropoff}
                    handlePickupChange={handlePickupChange}
                    handleDropoffChange={handleDropoffChange}
                  />
                  {showModal && modelComponent}
                  <div className="items-center flex">
                    <button
                      onClick={calculate}
                      className="p-2 mx-auto inline-block rounded bg-amber-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                    >
                      CALCULATE COST
                    </button>{" "}
                  </div>
                  <p className={"required-text"}>
                    <i>* Required field</i>
                  </p>
                </>
              ) : step === 3 ? (
                <>
                  <Summary delivery={delivery} />
                </>
              ) : (
                ""
              )}
              {showSuccess && success()}
            </div>
          </div>

          {paymentData ? (
            <div className={"delivery-btns"}>
              <Payment
                deliveryId={paymentData._id}
                deliveryPrice={paymentData.cost}
              />
            </div>
          ) : (
            ""
          )}
          <div className={`delivery-btns ${hideBtns ? "hide" : ""}`}>
            <button className="delivery-back-button" onClick={handelBack}>
              <span>{leftArrow}</span>
            </button>

            <button
              className="delivery-next-button"
              onClick={handelNext}
              disabled={
                step === 2
                  ? nextButtonDisabled
                  : !isWeightSelected || !isDescriptionAdded
              }
            >
              <span>{rightArrow}</span>
            </button>
          </div>
        </div>
      )}
      {error ? error.message : ""}
    </>
  );
};

export default SendForm;
