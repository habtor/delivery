import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const onSuccess = (data) => {
    setUser(data);
  };

  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/sign-in/profile",
    onSuccess
  );

  useEffect(() => {
    if (!user) {
      performFetch({ credentials: "include" });
    }

    return cancelFetch;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
