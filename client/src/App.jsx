import "./styles.css";
import "./output.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Home/Landing";
import LoginPage from "./pages/Login/LoginPage";
import SignUp from "./pages/Signup/SignUp";
import History from "./pages/History/History";
import Send from "./pages/Send/Send";
import { UserProvider } from "./context/userContext";
import HomePage from "./pages/Home/HomePage";
import DeliveryDetailsPage from "./pages/DeliveryDetails/DeliveryDetailsPage";
import DriverHistory from "./pages/DriverHistory/DriverHistory";
import DriverProfile from "./pages/UserProfile/DriverProfile";
import ClientProfile from "./pages/UserProfile/ClientProfile";

const App = () => {
  return (
    <UserProvider>
      <div className="app-container">
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/history" element={<History />} />
            <Route path="/send" element={<Send />} />
            <Route path="/delivery-details">
              <Route path=":id" element={<DeliveryDetailsPage />} />
            </Route>
            <Route path="/driver-history" element={<DriverHistory />} />
            <Route path="/driver-profile">
              <Route path=":id" element={<DriverProfile />} />
            </Route>
            <Route path="/client-profile">
              <Route path=":id" element={<ClientProfile />} />
            </Route>
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

export default App;
