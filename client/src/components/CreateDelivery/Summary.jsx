import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faRoad,
  faLocationDot,
  faHouse,
  faIdCard,
  faWeightHanging,
  faEuroSign,
  faAudioDescription,
  faRulerHorizontal,
} from "@fortawesome/free-solid-svg-icons";
const city = <FontAwesomeIcon icon={faCity} />;
const zip = <FontAwesomeIcon icon={faLocationDot} />;
const street = <FontAwesomeIcon icon={faRoad} />;
const house = <FontAwesomeIcon icon={faHouse} />;
const name = <FontAwesomeIcon icon={faIdCard} />;
const weight = <FontAwesomeIcon icon={faWeightHanging} />;
const distance = <FontAwesomeIcon icon={faRulerHorizontal} />;
const description = <FontAwesomeIcon icon={faAudioDescription} />;
const cost = <FontAwesomeIcon icon={faEuroSign} />;
const Summary = ({ delivery }) => {
  Summary.propTypes = {
    delivery: PropTypes.object,
  };
  return (
    <div className="px-10 font-light text-sm mt-10">
      <h2 className="flex font-semibold justify-center mt-10">Summary</h2>
      <p className="font-medium mt-6">Package Details:</p>
      <ul className="flex justify-between mt-5 mx-auto max-w-md">
        <li>
          {weight} {delivery.weight}
        </li>
        <li>
          {distance} {delivery.distance} KM
        </li>
        <li>
          {cost} {delivery.cost.toFixed(2)}
        </li>
      </ul>
      <p className="my-3 text-justify text-sm ">
        {description} {delivery.description}
      </p>
      <hr />
      <p className="my-3 font-medium">Sender{"'"}s Details:</p>
      <ul className="grid grid-cols-2 mb-3">
        <li className="flex">
          <span>{name}</span> <span>{delivery.pickup.firstname}</span>
        </li>
        <li className="flex">
          <span>{name}</span> <span>{delivery.pickup.lastname}</span>
        </li>
        <li className="flex">
          <span>{zip}</span> <span>{delivery.pickup.zipcode}</span>
        </li>
        <li className="flex">
          <span>{city}</span> <span>{delivery.pickup.city}</span>
        </li>
        <li className="flex">
          <span>{street}</span> <span>{delivery.pickup.street}</span>
        </li>
        <li className="flex">
          <span>{house}</span> <span>{delivery.pickup.number}</span>
        </li>
      </ul>
      <hr />
      <p className="my-3 font-medium">Receiver{"'"}s Details:</p>
      <ul className="grid grid-cols-2 mb-3">
        <li className="flex ">
          <span>{name}</span> <span>{delivery.dropoff.firstname}</span>
        </li>
        <li className="flex">
          <span>{name}</span> <span>{delivery.dropoff.lastname}</span>
        </li>
        <li className="flex">
          <span>{zip}</span> <span>{delivery.dropoff.zipcode}</span>
        </li>
        <li className="flex">
          <span>{city}</span> <span>{delivery.dropoff.city}</span>
        </li>
        <li className="flex">
          <span>{street}</span> <span>{delivery.dropoff.street}</span>
        </li>
        <li className="flex">
          <span>{house}</span> <span>{delivery.dropoff.number}</span>
        </li>
      </ul>
    </div>
  );
};
export default Summary;
