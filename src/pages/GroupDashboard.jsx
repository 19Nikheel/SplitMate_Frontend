import React, { useEffect, useState } from "react";
import "../components/GroupDashboard.css";
import ac from "../data/avatar.jpg";
import AddButton from "../components/AddButton";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../contexts/UserProvider";

const GroupDashboard = () => {
  const segment = useLocation().pathname.split("/").pop();
  const { name } = useUser();
  const [expandedId, setExpandedId] = useState(null);
  const [show, set] = useState(null);
  const [num, setnum] = useState(7);

  const toggleDetails = (id, a) => {
    setExpandedId(expandedId === id && show == a ? null : id);
    set(a);
  };
  const dummyLogs = [
    {
      id: 1,
      paidBy: ["Alice"],
      items: [
        { name: "Pizza", price: 300 },
        { name: "Drinks", price: 150 },
      ],
      participants: [
        { name: "Bob", amount: 200 },
        { name: "Charlie", amount: 250 },
      ],
      time: "2025-06-14 10:15",
    },
    {
      id: 2,
      paidBy: ["David"],
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
  ];
  const [array, setarray] = useState(dummyLogs);
  const [gname, setGname] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const name = await axiosInstance.get(`/findgroupname/${segment}`);
        setGname(name.data);

        const amount = await axiosInstance.get(`/findtotal/${segment}`);
        setAmount(amount.data);

        const data = await axiosInstance.get(`/findlog/${segment}`);
        setarray(data.data);

        const usep = await axiosInstance.get(`/findalluser/${segment}`);
        setUser(usep.data);
        console.log(usep);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, []);

  // const users = [
  //   { name: "Alice", image: { ac }, isHost: true },
  //   { name: "Bob", image: "../data/avatar2.jpg" },
  //   { name: "Charlie", image: "../data/avatar3.jpg" },
  //   { name: "Diana", image: "../data/avatar4.jpg" },
  //   { name: "Extra", image: "../data/avatar.jpg" },
  //   { name: "Alice", image: { ac }, isHost: true },
  //   { name: "Bob", image: "../data/avatar2.jpg" },
  //   { name: "Charlie", image: "../data/avatar3.jpg" },
  //   { name: "Diana", image: "../data/avatar4.jpg" },
  //   { name: "Extra", image: "../data/avatar.jpg" }, // won't show due to max 4
  // ];

  return (
    <div className="gbox flex-grow mt-24 mb-32">
      {<AddButton />}
      <div className="header">
        <div className="lbox">{gname}</div>
        <div className="rbox">Total Expense: {amount}</div>
      </div>

      <div className="mid">
        <div className="logs">
          <table className="log-table">
            <thead>
              <tr>
                <th>Paid By</th>
                <th>Item</th>
                <th>Participants</th>
                <th>total Amount</th>
              </tr>
            </thead>
            <tbody>
              {array.slice(0, num).map((log) => (
                <React.Fragment key={log.id}>
                  <tr>
                    <td>
                      <button className="name-btn">
                        {log.paidBy.map((item) => item).join(", ")}
                      </button>
                    </td>
                    <td>
                      <button className="name-btn">
                        {log.items.map((item) => item).join(", ")}
                      </button>
                    </td>
                    <td>
                      <button className="name-btn">
                        {log.participants.map((p) => p).join(", ")}
                      </button>
                    </td>
                    <td>
                      <button className="name-btn">{log.amount}</button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            className="show-more"
            onClick={() => {
              num == array.length ? setnum(7) : setnum(array.length);
            }}
          >
            {array.length > 7 && num !== array.length && "Show More..."}
            {num == array.length && "Show Less..."}
          </div>
        </div>
      </div>

      <div className="smid flex flex-wrap gap-4 p-4 pr-8 mr-12">
        {users.slice(0, 8).map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={user.image}
              alt={user.name}
              className={`w-16 h-16 rounded-full border-4 ${
                user.name === name ? "border-yellow-500" : "border-gray-300"
              }`}
            />
            <p className="text-sm mt-1">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDashboard;
