import React from "react";
import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axiosInstance";

const Forgetpass = () => {
  const { forget } = useAuth();
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
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
    try {
      const result = await forget(val, pass);
      console.log(result);
      setval("");
      setpass("");
      navigate("/newpass");
    } catch (err) {
      showAlert("Invalid credentials, please try again.", "danger");
    }
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="UserName"
        placeholder="Enter Username"
        HandleOnChange={HandleOnChange}
        val={val}
        req={"l"}
      />
      <Input
        type="text"
        label="Phone Number"
        placeholder="Enter phone no"
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
export default Forgetpass;
