import React from "react";
import "./CreateDeliveryForm.css";
import PropTypes from "prop-types";

const Description = ({ description, onDescriptionChange }) => {
  Description.propTypes = {
    description: PropTypes.string.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
  };
  return (
    <>
      <div className="deleivery-description">
        <p className="description-text">Description *</p>
        <textarea
          type="textarea"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default Description;
