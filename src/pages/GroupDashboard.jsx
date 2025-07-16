import React, { useState } from "react";
import "../components/GroupDashboard.css";
import ac from "../data/avatar.jpg";
import AddButton from "../components/AddButton";

const GroupDashboard = () => {
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
      paidBy: "Alice",
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
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 24,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 22,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 25,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 21,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 255,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 264,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
    {
      id: 245,
      paidBy: "David",
      items: [{ name: "Snacks", price: 200 }],
      participants: [{ name: "Eve", amount: 200 }],
      time: "2025-06-13 18:30",
    },
  ];
  const [array, setarray] = useState(dummyLogs);

  const users = [
    { name: "Alice", image: { ac }, isHost: true },
    { name: "Bob", image: "../data/avatar2.jpg" },
    { name: "Charlie", image: "../data/avatar3.jpg" },
    { name: "Diana", image: "../data/avatar4.jpg" },
    { name: "Extra", image: "../data/avatar.jpg" },
    { name: "Alice", image: { ac }, isHost: true },
    { name: "Bob", image: "../data/avatar2.jpg" },
    { name: "Charlie", image: "../data/avatar3.jpg" },
    { name: "Diana", image: "../data/avatar4.jpg" },
    { name: "Extra", image: "../data/avatar.jpg" }, // won't show due to max 4
  ];

  return (
    <div className="gbox flex-grow mt-24 mb-32">
      {<AddButton />}
      <div className="header">
        <div className="lbox">Group Name</div>
        <div className="rbox">Total Expense: ₹1000</div>
      </div>

      <div className="mid">
        <div className="logs">
          <table className="log-table">
            <thead>
              <tr>
                <th>Paid By</th>
                <th>Item</th>
                <th>Participants</th>
              </tr>
            </thead>
            <tbody>
              {array.slice(0, num).map((log) => (
                <React.Fragment key={log.id}>
                  <tr>
                    <td>
                      <button
                        onClick={() => toggleDetails(log.id, 1)}
                        className="name-btn"
                      >
                        {log.paidBy}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleDetails(log.id, 2)}
                        className="name-btn"
                      >
                        {log.items.map((item) => item.name).join(", ")}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleDetails(log.id, 3)}
                        className="name-btn"
                      >
                        {log.participants.map((p) => p.name).join(", ")}
                      </button>
                    </td>
                  </tr>
                  {expandedId === log.id && show === 1 && (
                    <tr>
                      <td colSpan="3">
                        <div className="details-box">
                          <strong>Items:</strong>
                          <ul className="combined-list">
                            {log.items.map((item, idx) => (
                              <li key={idx + 200}>
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                              </li>
                            ))}
                          </ul>
                          <strong>Participants:</strong>
                          <ul className="combined-list">
                            {log.participants.map((p, idx) => (
                              <li key={idx + 100}>
                                <span>{p.name}</span>
                                <span>₹{p.amount}</span>
                              </li>
                            ))}
                          </ul>
                          <div>
                            <em>{log.time}</em>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {expandedId === log.id && show === 2 && (
                    <tr>
                      <td colSpan="3">
                        <div className="details-box">
                          <strong>Items:</strong>
                          <ul className="combined-list">
                            {log.items.map((item, idx) => (
                              <li key={idx + 300}>
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}

                  {expandedId === log.id && show === 3 && (
                    <tr>
                      <td colSpan="3">
                        <div className="details-box">
                          <strong>Participants:</strong>
                          <ul className="combined-list">
                            {log.participants.map((p, idx) => (
                              <li key={idx + 500}>
                                <span>{p.name}</span>
                                <span>₹{p.amount}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
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
                user.isHost ? "border-yellow-500" : "border-gray-300"
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
