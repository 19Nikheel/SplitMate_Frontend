import { Link, Route, Routes, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useStateContext } from "../contexts/ContextProvider";

const Authpage = ({ children }) => {
  const { currentColor } = useStateContext();
  const location = useLocation();

  const currentPath = location.pathname;

  const buttons = [
    { path: "/login", name: "Login" },
    { path: "/signup", name: "SignUp" },
    { path: "/send-request", name: "Send Request" },
    { path: "/guest-login", name: "Guest Log in" },
    { path: "/enter-channel", name: "Enter Channel" },
    // { path: "/newpass", name: "New Password" },
    // { path: "/forgetpass", name: "Forget Password" },
  ];

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-left">{children}</div>

        <div className="auth-right">
          {buttons.map(({ path, name }) =>
            currentPath === path ? null : (
              <Link to={path} key={path}>
                <Button
                  color="btn btn-primary btp"
                  bgColor={currentColor}
                  text={name}
                  width="40"
                  borderRadius="10px"
                />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default Authpage;
