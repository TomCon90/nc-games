import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

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
