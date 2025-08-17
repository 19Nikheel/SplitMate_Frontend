import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

//import { Home, Calendar, Kanban, Line, Pie } from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

// import { Authpage } from "./pages/Authpage";
// import GroupDashboard from "./pages/GroupDashboard";
// import Joined from "./pages/Joined";
// import MainLayout from "./components/MainLayout";
// import Todo from "./pages/Todo";

const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const SendRequest = lazy(() => import("./components/SendRequest"));
const Guestlogin = lazy(() => import("./components/Guestlogin"));
const EnterChannel = lazy(() => import("./components/EnterChannel"));

const Home = lazy(() => import("./pages/Home"));
const Calendar = lazy(() => import("./pages/Calendar"));
//const Line = lazy(() => import("./pages/Line"));
//const Pie = lazy(() => import("./pages/Pie"));
const Authpage = lazy(() => import("./pages/Authpage"));
const GroupDashboard = lazy(() => import("./pages/GroupDashboard"));
const Joined = lazy(() => import("./pages/Joined"));
const MainLayout = lazy(() => import("./components/MainLayout"));
const Todo = lazy(() => import("./pages/Todo"));
const Forgetpass = lazy(() => import("./components/Forgetpass"));
const NewPass = lazy(() => import("./components/NewPass"));

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();

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
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-lg font-semibold">
            Loading...
          </div>
        }
      >
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
          <Route
            path="/forget"
            element={
              <Authpage>
                <Forgetpass />
              </Authpage>
            }
          />
          <Route path="/newpass" element={<NewPass />} />

          {/* Protected routes with layout and AuthProvider */}
          <Route
            path="/"
            element={
              //<AuthProvider>
              <MainLayout></MainLayout>
              //</AuthProvider>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="hosted" element={<Joined />} />
            <Route path="hosted/:gid" element={<GroupDashboard />} />
            <Route path="joined" element={<Joined />} />
            <Route path="joined/:gid" element={<GroupDashboard />} />
            <Route path="Todo" element={<Todo />} />
            <Route path="calendar" element={<Calendar />} />
            {/* //<Route path="line" element={<Line />} />
            //<Route path="pie" element={<Pie />} /> */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
