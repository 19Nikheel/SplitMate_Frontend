import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import axiosInstance from "../api/axiosInstance";
import { useAlert } from "../contexts/AlertContext";
import { useStateContext } from "../contexts/ContextProvider";
import { useUser } from "../contexts/UserProvider";

export const UserList = ({ users }) => {
  const segment = useLocation().pathname.split("/").pop();
  const { name, role } = useUser();

  const [open, close] = useState(false);
  const [nam, setname] = useState("");
  const [ad, setad] = useState([]);

  const { showAlert } = useAlert();
  const { currentColor } = useStateContext();

  useEffect(() => {
    setad(users.filter((u) => u.host).map((u) => u.name));
  }, [users]);

  const handleOnClick = (n) => {
    setname(n);
    close(!open);
  };

  const isAdmin = ad.includes(name);

  const deleteSession = async () => {
    try {
      const res = await axiosInstance.put(
        `/realive-auth?groupId=${segment}&name=${nam.name}`
      );
      if (res.status == 200) {
        close(!open);
        showAlert(" Session deleted !", "success");
      }
    } catch (err) {
      showAlert("Error", "danger");
    }
  };

  const userSettelement = () => {};
  return (
    <div className="smid flex flex-wrap gap-4 p-4 pr-8 mr-12 justify-center">
      {users.slice(0, 8).map((user, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            src={user.image}
            alt={user.name}
            onClick={() => handleOnClick(user)}
            className={`w-16 h-16 rounded-full border-4 ${
              user.host ? "border-yellow-500" : "border-gray-300"
            }`}
          />
          <p className="text-sm mt-1">{user.name}</p>
        </div>
      ))}

      {open && isAdmin && (
        <Modal onClose={handleOnClick}>
          <Button
            H={"d"}
            color="btn btn-primary btp"
            bgColor={currentColor}
            width="20"
            borderRadius="10px"
            text={"Re-auth"}
            HandleOnSubmit={deleteSession}
          ></Button>
        </Modal>
      )}
    </div>
  );
};
