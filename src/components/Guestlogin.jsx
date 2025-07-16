import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Guestlogin = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [name, setname] = useState("");
  const { singup_guest } = useAuth();
  const HandleOnChange = (event) => {
    setname(event.target.value);
  };

  const Handleonsubmit = async () => {
    const result = await singup_guest(name);
    console.log(result.data);
    if (result.status === 200) {
      navigate("/");
    } else {
      showAlert("Somehting Wrong , please try again.", "danger");
    }
    setname("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="Name"
        placeholder="Enter Name"
        HandleOnChange={HandleOnChange}
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
