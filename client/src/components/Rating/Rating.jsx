import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { CiStar } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useUser } from "../../context/userContext";

export default function Rating({ deliveryId, delivery }) {
  const { user } = useUser();
  if (delivery?.status !== "Delivered" || user?.role === "driver") {
    return null;
  }

  if (delivery?.rated === true) {
    return (
      <h3 className="text-xs ml-5 mb-2">Your rating is {delivery?.rating}</h3>
    );
  }

  const [rating, setRating] = useState(0);
  const [starSize] = useState(20);

  const onSuccess = () => {
    window.location.reload();
  };

  const { performFetch } = useFetch(
    `/delivery?id=${deliveryId}&rating=${rating}`,
    onSuccess
  );

  const handleClick = () => {
    if (rating === 0) {
      return;
    }
    performFetch({
      method: "PATCH",
    });
  };

  const getStarSize = (index) => {
    return index + 1 <= rating ? starSize + 5 : starSize;
  };

  return (
    <div className="flex flex-col gap-4 ml-5 mb-3">
      <p>Want to rate?</p>
      <div className="flex flex-row cursor-pointer ">
        {[1, 2, 3, 4, 5].map((index) => (
          <CiStar
            key={index}
            size={getStarSize(index - 1)}
            onClick={() => setRating(index)}
          />
        ))}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded ml-5"
          onClick={handleClick}
        >
          <FaCheck />
        </button>
      </div>
    </div>
  );
}

Rating.propTypes = {
  deliveryId: PropTypes.string,
  delivery: PropTypes.shape({
    status: PropTypes.string,
    rated: PropTypes.bool,
    rating: PropTypes.number,
  }),
};
