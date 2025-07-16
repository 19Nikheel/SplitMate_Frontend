import { useReducer } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";

const initial = {
  val: "",
  pass: "",
  phone: "",
};

const reducer = (current, action) => {
  switch (action.type) {
    case "update":
      return {
        ...current,
        [action.field]: action.value,
      };
    case "submit":
      return initial;
    default:
      return current;
  }
};

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showAlert } = useAlert();
  const { currentColor } = useStateContext();
  const [state, dispatch] = useReducer(reducer, initial);

  const HandleOnChange = (field) => (event) => {
    dispatch({ type: "update", field, value: event.target.value });
  };

  const HandleOnsubmit = async () => {
    const { val, pass, phone } = state;
    if (val && pass && phone) {
      const result = await signup(val, pass, phone);
      console.log(result);
      if (result.status === 200) {
        showAlert("User ID :." + result.data, "info");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        showAlert("Invalid credentials, please try again.", "danger");
      }
      dispatch({ type: "submit" });
    }
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="Full Name"
        placeholder="Enter name"
        HandleOnChange={HandleOnChange("val")}
        val={state.val}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        HandleOnChange={HandleOnChange("pass")}
        val={state.pass}
      />
      <Input
        type="text"
        label="Phone No"
        placeholder="Enter Phone number"
        HandleOnChange={HandleOnChange("phone")}
        val={state.phone}
      />

      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Sign up"
        H="k"
        HandleOnSubmit={HandleOnsubmit}
      />
    </div>
  );
};
