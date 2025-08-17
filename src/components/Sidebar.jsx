import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdHomeFilled } from "react-icons/md";
import { RiSignalTowerFill } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";

import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";
import { BsKanban } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { useStateContext } from "../contexts/ContextProvider";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const links = [
    {
      name: "home",
      icon: <MdHomeFilled />,
    },
    {
      name: "hosted",
      icon: <RiSignalTowerFill />,
    },
    {
      name: "joined",
      icon: <TiGroupOutline />,
    },

    {
      name: "calendar",
      icon: <AiOutlineCalendar />,
    },
    {
      name: "Todo",
      icon: <BsKanban />,
    },
    // {
    //   name: "line",
    //   icon: <AiOutlineStock />,
    // },
    // {
    //   name: "pie",
    //   icon: <FiPieChart />,
    // },
  ];

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>SplitMate</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.name + "1"}>
                <NavLink
                  to={`/${item.name}`}
                  key={item.name}
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : "",
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {item.icon}
                  <span className="capitalize ">{item.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
