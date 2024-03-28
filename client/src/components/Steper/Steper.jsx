import React from "react";
import "./Steper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Steper = ({ totalSteps, currentStep, steps }) => {
  Steper.propTypes = {
    totalSteps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.array,
  };

  const checkIcone = <FontAwesomeIcon icon={faCheck} />;

  const renderSteps = () => {
    const stepsArray = [];
    for (let i = 1; i <= totalSteps; i++) {
      const isCompleted = i < currentStep;
      const isCurrent = i === currentStep;

      stepsArray.push(
        <div key={i} className="abc">
          <div
            className={`steper-circle ${isCompleted ? "full-circle" : ""} ${
              isCurrent ? "on-progress-circle" : ""
            }`}
          >
            <span>{isCompleted ? checkIcone : i}</span>
          </div>
          {steps ? <div className="step-name">{steps[i - 1]}</div> : null}
        </div>
      );
    }
    return stepsArray;
  };

  return (
    <div className="steper-container1">
      <div className="steper-container">{renderSteps()}</div>
      <div className="steper-line"></div>
    </div>
  );
};

export default Steper;
