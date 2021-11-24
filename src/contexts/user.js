import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const isLoggedIn = !!user.username;

  const logout = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
