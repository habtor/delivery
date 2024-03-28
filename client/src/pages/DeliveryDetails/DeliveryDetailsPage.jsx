import React, { useState, useEffect } from "react";
import AvailableDrivers from "../../components/AvailableDrivers/AvailableDrivers";
import Nav from "../../components/Nav/Nav";
import { useUser } from "../../context/userContext";
import DeliveryDetails from "../../components/DeliveryDetails/DeliveryDetails";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
export default function DeliveryDetailsPage() {
  const { user } = useUser();
  const { id } = useParams();
  const [component, setComponent] = useState(null);

  const onSuccessPending = (data) => {
    if (data.driver) {
      setComponent(<DeliveryDetails id={id} />);
    } else {
      setComponent(<AvailableDrivers id={id} city={data.pickup.city} />);
    }
  };

  const {
    isLoading: isLoadingPending,
    error: errorPending,
    performFetch: performFetchPending,
  } = useFetch(`/delivery?deliveryId=${id}`, onSuccessPending);

  useEffect(() => {
    performFetchPending();
  }, []);

  if (isLoadingPending) {
    return <div>Loading...</div>;
  } else if (errorPending) {
    return <div>Something went wrong getting pending delivery</div>;
  }

  return (
    <>
      <Nav />
      <div className="history-all">
        <div className="history-section-container">
          <div className="welcome-message">
            <h4>
              Welcome <span className="user-name">{user?.firstname}</span>, here
              is your delivery history.
            </h4>
          </div>
          {component}
        </div>
        <div className="history-image-div"></div>
      </div>
    </>
  );
}
