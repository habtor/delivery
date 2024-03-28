import React from "react";
import "./CreateDeliveryForm.css";
import PropTypes from "prop-types";

const Size = ({ selectedSize, onRadioChange }) => {
  Size.propTypes = {
    selectedSize: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
  };
  return (
    <div>
      <>
        <div className="size-container">
          <p className="size-text">Size *</p>
          <div className="size-selection">
            <label className="size-radio-btn">
              <input
                type="radio"
                name="weight"
                value={2}
                checked={selectedSize === "Small"}
                onChange={() => onRadioChange("Small")}
              />
              <div className="size-details">
                <img src="https://res.cloudinary.com/domvgm4cs/image/upload/v1706978252/envelop_mudvft.png" />
                <p className="size-description">
                  This option is suitable for items less than 1 kg
                </p>
                <p>
                  <i>
                    from <br />
                    <span>$2</span>
                  </i>
                </p>
              </div>
            </label>
          </div>
          <div className="size-selection">
            <label className="size-radio-btn">
              <input
                type="radio"
                name="weight"
                value={4}
                checked={selectedSize === "Medium"}
                onChange={() => onRadioChange("Medium")}
              />
              <div className="size-details">
                <img src="https://res.cloudinary.com/domvgm4cs/image/upload/v1707431805/box_vb1qwv.png" />
                <p className="size-description">
                  This option is suitable for items less than 3 kg and more than
                  1 kg
                </p>
                <p>
                  <i>
                    from <br />
                    <span>$4</span>
                  </i>
                </p>
              </div>
            </label>
          </div>
          <div className="size-selection">
            <label className="size-radio-btn">
              <input
                type="radio"
                name="weight"
                value={6}
                checked={selectedSize === "Big"}
                onChange={() => onRadioChange("Big")}
              />
              <div className="size-details">
                <img src="https://res.cloudinary.com/domvgm4cs/image/upload/v1707431810/bigbox_zwtlw0.png" />
                <p className="size-description">
                  This option is suitable for items less than 5 kg and more than
                  3 kg
                </p>
                <p>
                  <i>
                    from <br />
                    <span>$6</span>
                  </i>
                </p>
              </div>
            </label>
          </div>
        </div>
      </>
    </div>
  );
};

export default Size;
