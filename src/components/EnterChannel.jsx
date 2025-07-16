import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const EnterChannel = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [name, setname] = useState("");
  const [groupId, setGroupId] = useState("");
  const { Enter_Channel } = useAuth();

  const HandleOnChange = (event) => {
    setGroupId(event.target.nameue);
  };

  const HandleOnChangepass = (event) => {
    setname(event.target.nameue);
  };
  const Handleonsubmit = async () => {
    const result = await Enter_Channel(groupId, name);
    if (result.success) {
      navigate("/");
    } else {
      showAlert("Invalid credentials, please try again.", "danger");
    }
    setname(""), settime("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="GroupId"
        placeholder="Enter GroupId"
        HandleOnChange={HandleOnChange}
        val={groupId}
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
        text="Log in"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};
