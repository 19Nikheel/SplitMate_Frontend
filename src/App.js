import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { SendRequest } from "./components/SendRequest";
import { Guestlogin } from "./components/Guestlogin";
import { EnterChannel } from "./components/EnterChannel";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Home, Calendar, Kanban, Line, Pie } from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { Authpage } from "./pages/Authpage";
import GroupDashboard from "./pages/GroupDashboard";
import Joined from "./pages/Joined";
import AddExpense from "./components/AddExpense";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/MainLayout";
import Todo from "./pages/Todo";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Routes>
        {/* Public routes without layout */}
        <Route
          path="/login"
          element={
            <Authpage>
              <Login />
            </Authpage>
          }
        />
        <Route
          path="/signup"
          element={
            <Authpage>
              <Signup />
            </Authpage>
          }
        />
        <Route
          path="/send-request"
          element={
            <Authpage>
              <SendRequest />
            </Authpage>
          }
        />
        <Route
          path="/guest-login"
          element={
            <Authpage>
              <Guestlogin />
            </Authpage>
          }
        />
        <Route
          path="/enter-channel"
          element={
            <Authpage>
              <EnterChannel />
            </Authpage>
          }
        />

        {/* Protected routes with layout and AuthProvider */}
        <Route
          path="/"
          element={
            <AuthProvider>
              <MainLayout></MainLayout>
            </AuthProvider>
          }
        >
          <Route index element={<GroupDashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="hosted" element={<Joined />} />
          <Route path="hosted/:gid" element={<GroupDashboard />} />
          <Route path="joined" element={<Joined />} />
          <Route path="joined/:gid" element={<GroupDashboard />} />
          <Route path="Todo" element={<Todo />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="line" element={<Line />} />
          <Route path="pie" element={<Pie />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
