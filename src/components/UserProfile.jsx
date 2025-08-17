import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { logout } = useAuth();
  const { name, id, role } = useUser();
  const navigate = useNavigate();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> {role} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {id}{" "}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <Link
            to="/Todo"
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "rgb(254, 201, 15)",
            }}
            className="text-xl rounded-lg p-3 hover:bg-light-gray flex items-center justify-center"
          >
            <FiCreditCard />
          </Link>

          <div>
            <p className="font-semibold dark:text-gray-200 ">My Tasks</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              {"To-do and Daily Tasks"}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          H={"d"}
          HandleOnSubmit={() => logout()}
        />
      </div>
    </div>
  );
};

export default UserProfile;
