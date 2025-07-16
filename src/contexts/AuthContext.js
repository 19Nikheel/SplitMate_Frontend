import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance, { axiosAuth } from "../api/axiosInstance";
import { useUser } from "./UserProvider";
import { useAlert } from "./AlertContext";

const AuthContext = createContext({
  accessToken: "",
  setAccessToken: () => {},
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  getToken: () => {},
  logout: () => {},
  sendRequest: async () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { setId, setName, setRole } = useUser();

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const arr = ["/signup", "/send-request", "/guest-login", "/enter-channel"];

  useEffect(() => {
    const checkAuth = async () => {
      if (!arr.includes(location.pathname)) {
        if (!accessToken) {
          navigate("/login");
          setLoading(false);
          return;
        }

        try {
          const response = await fetch("http://localhost:8080/check", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // if (response.status === 401) {
          //   // Access token invalid or expired, try refreshing
          //   const refreshResponse = await fetch("https://your-api.com/refresh", {
          //     method: "POST",
          //     credentials: "include", // if refresh token is in HttpOnly cookie
          //   });

          //   if (refreshResponse.ok) {
          //     const data = await refreshResponse.json();
          //     setAccessToken(data.accessToken);
          //     localStorage.setItem("accessToken", data.accessToken);
          //   } else {
          //     // Refresh token also invalid, redirect to login
          //     navigate("/login");
          //   }
          // }
        } catch (error) {
          console.error("Auth check failed", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        // If path is in public array, no auth check needed
        setLoading(false);
      }
    };

    checkAuth();
  }, [accessToken, navigate, location.pathname]);

  const login = async (userName, password) => {
    try {
      const response = await axiosAuth.post("/login", {
        userName,
        password,
      });
      if (response.status === 200) {
        const token = response.data.jwttoken;
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        setId(response.data.username);
        setName(response.data.name);
        setRole(response.data.role);
        return { success: true, response };
      }
      return { success: false, error: "Invalid response status" };
    } catch (error) {
      console.error("Login error", error);
      return { success: false, error };
    }
  };

  const Enter_Channel = async (username, name) => {
    try {
      const response = await axiosAuth.post("/login-user", {
        username,
        name,
      });
      if (response.status === 200) {
        const token = response.data.jwttoken;
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        setId(response.data.username);
        setName(response.data.name);
        setRole(response.data.role);
        return { success: true, response };
      }
      return { success: false, error: "Invalid response status" };
    } catch (error) {
      console.error("Login error", error);
      return { success: false, error };
    }
  };

  const signup = async (name, password, phoneNo) => {
    const response = await axiosAuth.post("/signup", {
      name,
      password,
      phoneNo,
    });
    console.log(response.data);
    if (response.status === 200) {
      return response;
    }
  };

  const sendRequest = async (groupId, name) => {
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("groupId", groupId);

    try {
      const response = await axiosAuth.post("/push-request", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      showAlert("Request sended", "info");
    } catch (error) {
      if (error.response.status === 404) {
        showAlert("Group Not Found", "danger");
      } else if (error.response.status === 400) {
        showAlert("This name is already taken", "danger");
      } else {
        showAlert("Error", "danger");
      }
    }
  };

  const singup_guest = async (name) => {
    const response = await axiosAuth.post("/signup-guest", {
      name,
    });
    if (response.status === 200) {
      const token = response.data.jwttoken;
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
      setId(response.data.username);
      setName(response.data.name);
      setRole(response.data.role);
      return response;
    }
  };

  const guest_user = async (name, username) => {
    const response = await axiosAuth.post("/login-user", {
      username,
      name,
    });
    if (response.status === 200) {
      const token = response.data.jwttoken;
      localStorage.setItem("accessToken", token);
      setAccessToken(token);
      setId(response.data.username);
      setName(response.data.name);
      setRole(response.data.role);
      return response;
    }
  };

  const logout = () => {
    console.log("is");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        signup,
        guest_user,
        singup_guest,
        loading,
        setLoading,
        logout,
        sendRequest,
        Enter_Channel,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
