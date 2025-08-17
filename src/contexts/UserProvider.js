import React, { createContext, useContext, useState } from "react";

const userContext = createContext({
  userName: "",
  setName: () => {},
  id: "",
  setId: () => {},
  role: "",
  setRole: () => {},
  setg: () => {},
});

export const UserProvider = ({ children }) => {
  const [name, setame] = useState(localStorage.getItem("name"));
  const [id, setd] = useState(localStorage.getItem("id"));
  const [role, setole] = useState(localStorage.getItem("role"));
  const [gid, setgid] = useState(localStorage.getItem("gid"));

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

  const setg = (n) => {
    localStorage.setItem("gid", n);
    setgid(n);
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
        gid,
        setg,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
export const useUser = () => useContext(userContext);
