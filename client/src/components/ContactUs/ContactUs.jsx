import React from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPhone,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

const mail = <FontAwesomeIcon icon={faPaperPlane} />;
const phone = <FontAwesomeIcon icon={faPhone} />;
const copy = <FontAwesomeIcon icon={faCopyright} />;
const stripe = <FontAwesomeIcon icon={faStripe} />;

const ContactUs = () => {
  return (
    <div id="contact-us" className="contact-us-container">
      <div className="email-and-youtube">
        <h4>
          <span>{mail}</span> help@delivery.com
        </h4>
        <div className="social">
          <p>
            <span>{phone}</span> +316811573
          </p>
        </div>
      </div>

      <div className="copyrights">
        <div>
          <p>
            All Right Reserved <span>{copy}</span> 2024 Delivery
          </p>
        </div>
        <div className="payment">
          <p>
            We Accept Payment via <span className="text-2xl">{stripe}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
