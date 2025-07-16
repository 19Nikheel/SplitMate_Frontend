import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const { currentColor } = useStateContext();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const [val, setval] = useState("");
  const [pass, setpass] = useState("");

  const HandleOnChange = (event) => {
    setval(event.target.value);
  };

  const HandleOnChangepass = (event) => {
    setpass(event.target.value);
  };
  const Handleonsubmit = async () => {
    const result = await login(val, pass);
    if (result.success) {
      navigate("/");
    } else {
      showAlert("Invalid credentials, please try again.", "danger");
    }
    setval("");
    setpass("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="UserName"
        placeholder="Enter name"
        HandleOnChange={HandleOnChange}
        val={val}
        req={"l"}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        HandleOnChange={HandleOnChangepass}
        val={pass}
        req={"k"}
      />
      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Login"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};
