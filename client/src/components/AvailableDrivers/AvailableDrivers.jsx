import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useUser } from "../../context/userContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import avarageRating from "../../util/avarageRating";
import "./availableDrivers.css";
export default function AvailableDrivers({ id, city }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriverId, setSelectedDriverId] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [diableRequestBtn, setDiableRequestBtn] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const onSuccess = (data) => {
    const dataDrivers = data.drivers.sort((a, b) => b.rating - a.rating);
    setDrivers(dataDrivers);
  };

  const { isLoading, error, performFetch } = useFetch(
    `/driver?city=${city}`,
    onSuccess
  );

  useEffect(() => {
    performFetch();
  }, [user?._id]);

  const {
    isLoading: isLoadingPatch,
    error: errorPatch,
    performFetch: performFetchPatch,
  } = useFetch(`/delivery?id=${id}`, () => {
    window.location.href = `/delivery-details/${id}`;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Something went wrong showing the dirvers</div>;
  }

  if (isLoadingPatch) {
    return <div>Loading...</div>;
  } else if (errorPatch) {
    return <div>Something went wrong adding the driver</div>;
  }

  const driversPerPage = 5;

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers?.slice(indexOfFirstDriver, indexOfLastDriver);

  const clickNextHandle = () => {
    setCurrentPage(currentPage + 1);
  };

  const clickPrevHandle = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleApprove = (driver) => {
    performFetchPatch({
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        driver: driver?._id,
      }),
    });
  };

  return (
    <>
      {}

      <div className="delivery-container">
        <div className="step-title">
          <p>Available Drivers</p>
        </div>
        <div className="delivery-items">
          <div>
            <div className="history-items-with-btns">
              <div className="driver-items-container">
                {currentDrivers?.map((driver, index) => (
                  <div
                    className="driver"
                    key={index}
                    style={{
                      backgroundColor: `${
                        selectedDriverId === driver._id ? "orange" : "#C7C7C7"
                      }`,
                    }}
                    onClick={() => {
                      setSelectedDriver(driver);
                      setDiableRequestBtn(false);
                      setSelectedDriverId(driver._id);
                    }}
                  >
                    <div>
                      <div
                        onClick={() =>
                          navigate(`/driver-profile/${driver?._id}`)
                        }
                        className="cursor-pointer"
                      >
                        <img src="https://svgur.com/i/131J.svg" alt="avatar" />
                      </div>
                      <div className="driver-details">
                        <div>
                          <div className="driver-info">
                            <div>
                              <p>{`${driver.firstname} ${driver.lastname}`}</p>
                            </div>
                            <div>
                              <p>{driver.vehicle}</p>
                              <p>{driver.deliveries.length} deliveries</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="star-rating">
                      <img src="https://svgshare.com/i/1316.svg" alt="star" />
                      <p>{avarageRating(driver?.ratings)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="approve-btn-container">
                  {currentPage !== 1 && (
                    <button onClick={clickPrevHandle}>Prev</button>
                  )}
                  {indexOfLastDriver < drivers.length && (
                    <button onClick={clickNextHandle}>Next</button>
                  )}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <button
          onClick={() => {
            handleApprove(selectedDriver);
          }}
          className={diableRequestBtn ? "disabled" : "enabled"}
        >
          Request driver
        </button>
      </div>
    </>
  );
}

AvailableDrivers.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  city: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
