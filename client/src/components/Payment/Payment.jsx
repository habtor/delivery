import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import "../CreateDelivery/CreateDeliveryForm.css";

const Payment = ({ deliveryId, deliveryPrice }) => {
  const onSuccess = (data) => {
    window.location = data.url;
  };

  const { performFetch, cancelFetch } = useFetch("/payment", onSuccess);

  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, []);

  const handleClick = async () => {
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryId,
        deliveryPrice,
      }),
    });
  };

  return (
    <button className="delivery-pay-button " onClick={handleClick}>
      Pay
    </button>
  );
};

Payment.propTypes = {
  deliveryId: PropTypes.string.isRequired,
  deliveryPrice: PropTypes.number.isRequired,
};

export default Payment;
