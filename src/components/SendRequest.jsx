import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { axiosAuth } from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
export const SendRequest = () => {
  const { currentColor } = useStateContext();
  const [val, setval] = useState("");
  const [name, setname] = useState("");
  const { sendRequest } = useAuth();
  const { showAlert } = useAlert();

  const HandleOnChange = (event) => {
    setval(event.target.value);
  };

  const HandleOnChangepass = (event) => {
    setname(event.target.value);
  };
  const Handleonsubmit = () => {
    sendRequest(val, name);
    // console.log(response.data);
    // if (response.status === 200) {
    //   showAlert(response.data, "info");
    // }

    setval(""), setname("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="GroupId"
        placeholder="Enter GroupId"
        HandleOnChange={HandleOnChange}
        val={val}
      />
      <Input
        type="text"
        label="Name"
        placeholder="Enter Name"
        HandleOnChange={HandleOnChangepass}
        val={name}
      />
      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Send Request"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};
