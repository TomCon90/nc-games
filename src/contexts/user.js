import React from "react";
import { createContext, useState } from "react";

//place to store the universal state
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    username: "jessjelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
    name: "Jess Jelly",
  });
  const isLoggedIn = !!currentUser.username;

  const logout = () => {
    setCurrentUser({});
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
