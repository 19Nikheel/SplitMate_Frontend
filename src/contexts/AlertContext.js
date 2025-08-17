import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const navigate = useNavigate();

  const [open, close] = useState({});

  const showAlert = useCallback(
    (message, type, sp) => {
      close({ message, type });

      setTimeout(() => {
        close({});
        sp === "ok" && color === "go" && navigate("/login", { replace: true });
      }, 3000);
    },
    [navigate]
  );

  return (
    <>
      <AlertContext.Provider value={{ showAlert }}>
        {children}
        {open.message && <Alert desc={open.message} type={open.type} />}
      </AlertContext.Provider>
    </>
  );
};

export const useAlert = () => useContext(AlertContext);
