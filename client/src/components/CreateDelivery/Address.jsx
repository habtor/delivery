import React from "react";
import "./CreateDeliveryForm.css";
import PropTypes from "prop-types";

const Address = ({
  pickup,
  dropoff,
  handlePickupChange,
  handleDropoffChange,
}) => {
  Address.propTypes = {
    pickup: PropTypes.object.isRequired,
    dropoff: PropTypes.object.isRequired,
    handlePickupChange: PropTypes.func.isRequired,
    handleDropoffChange: PropTypes.func.isRequired,
  };

  return (
    <>
      <div className="address-container">
        <h4 className="from-address-text ">Sender&lsquo;s details:</h4>
        <div className="sender-container">
          <div>
            <p>First name*</p>
            <input
              type="text"
              name="sender"
              value={pickup.firstname}
              onChange={(e) => handlePickupChange("firstname", e.target.value)}
            />
          </div>
          <div>
            <p>Last name*</p>
            <input
              type="text"
              name="sender"
              value={pickup.lastname}
              onChange={(e) => handlePickupChange("lastname", e.target.value)}
            />
          </div>
          <div>
            <p>Zip code*</p>
            <input
              type="text"
              name="sender"
              value={pickup.zipcode}
              onChange={(e) => handlePickupChange("zipcode", e.target.value)}
            />
          </div>
          <div>
            <p>City*</p>
            <input
              type="text"
              name="sender"
              value={pickup.city}
              onChange={(e) => handlePickupChange("city", e.target.value)}
            />
          </div>
          <div>
            <p>Street*</p>
            <input
              type="text"
              name="sender"
              value={pickup.street}
              onChange={(e) => handlePickupChange("street", e.target.value)}
            />
          </div>
          <div>
            <p>House number*</p>
            <input
              type="number"
              name="sender"
              value={pickup.number}
              onChange={(e) => handlePickupChange("number", e.target.value)}
            />
          </div>
        </div>
        <h4 className="to-address-text">Receiver&lsquo;s details:</h4>
        <div className="sender-container">
          <div>
            <p>First name*</p>
            <input
              type="text"
              name="receiver"
              value={dropoff.firstname}
              onChange={(e) => handleDropoffChange("firstname", e.target.value)}
            />
          </div>
          <div>
            <p>Last name*</p>
            <input
              type="text"
              name="receiver"
              value={dropoff.lastname}
              onChange={(e) => handleDropoffChange("lastname", e.target.value)}
            />
          </div>
          <div>
            <p>Zip code*</p>
            <input
              type="text"
              name="receiver"
              value={dropoff.zipcode}
              onChange={(e) => handleDropoffChange("zipcode", e.target.value)}
            />
          </div>
          <div>
            <p>City*</p>
            <input
              type="text"
              name="receiver"
              value={dropoff.city}
              onChange={(e) => handleDropoffChange("city", e.target.value)}
            />
          </div>
          <div>
            <p>Street*</p>
            <input
              type="text"
              name="receiver"
              value={dropoff.street}
              onChange={(e) => handleDropoffChange("street", e.target.value)}
              required
            />
          </div>
          <div>
            <p>House number*</p>
            <input
              type="number"
              name="receiver"
              value={dropoff.number}
              onChange={(e) => handleDropoffChange("number", e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* {showModal && modelComponent}
      <div className="items-center flex">
        <button
          onClick={calculate}
          className="p-2 mx-auto inline-block rounded bg-amber-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
        >
          CALCULATE COST
        </button>{" "}
      </div> */}
    </>
  );
};

export default Address;
