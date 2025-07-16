import React, { createContext, useContext, useState } from "react";

const userContext = createContext({
  userName: "",
  setName: () => {},
  id: "",
  setId: () => {},
  role: "",
  setRole: () => {},
});

export const UserProvider = ({ children }) => {
  const [name, setame] = useState(localStorage.getItem("name"));
  const [id, setd] = useState(localStorage.getItem("id"));
  const [role, setole] = useState(localStorage.getItem("role"));

  const setName = (n) => {
    localStorage.setItem("name", n);
    setame(n);
  };

  const setId = (n) => {
    localStorage.setItem("id", n);
    setd(n);
  };

  const setRole = (n) => {
    localStorage.setItem("role", n);
    setole(n);
  };

  return (
    <userContext.Provider
      value={{
        name,
        setName,
        id,
        setId,
        role,
        setRole,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const useUser = () => useContext(userContext);
