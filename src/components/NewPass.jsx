import React from "react";
import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";

const NewPass = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { currentColor } = useStateContext();
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const { newPass } = useAuth();

  const HandleOnChange = (event) => {
    setname(event.target.value);
  };

  const HandleOnChange2 = (event) => {
    setpass(event.target.value);
  };

  const Handleonsubmit = async () => {
    if (pass !== name) {
      showAlert("Password mismatch.", "danger");
    } else {
      const result = await newPass(name);
      console.log(result.data);
      if (result.status === 200) {
        navigate("/login");
      } else {
        showAlert("Somehting Wrong , please try again.", "danger");
      }
      setname("");
    }
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="Password"
        placeholder="Enter password"
        HandleOnChange={HandleOnChange}
        val={name}
      />

      <Input
        type="password"
        label="Confirm password"
        placeholder="Enter password"
        HandleOnChange={HandleOnChange2}
        val={pass}
      />

      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Log in"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};

export default NewPass;
