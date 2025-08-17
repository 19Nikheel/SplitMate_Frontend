import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "../components/GroupDashboard.css";
import AddButton from "../components/AddButton";
import axiosInstance from "../api/axiosInstance";
import { useStateContext } from "../contexts/ContextProvider";
import { useAlert } from "../contexts/AlertContext";
import Modal from "../components/Modal";
import Gdt1 from "../components/Gdt1";
import { UserList } from "../components/UserList";

const GroupDashboard = () => {
  const segment = useLocation().pathname.split("/").pop();

  const navigate = useNavigate();
  const showAlert = useAlert();

  const [num, setnum] = useState(7);
  const [selectedLog, setSelectedLog] = useState(null);
  const [array, setarray] = useState([]);
  const [gname, setGname] = useState("");
  const [amount, setAmount] = useState("");
  const { users, setUser } = useStateContext();

  const fetchLogs = async () => {
    try {
      const data = await axiosInstance.get(`/findlog/${segment}`);
      setarray(data.data);
    } catch (error) {
      console.error("Error fetching logs:", error.response.data);
    }
  };

  const handleLogdel = async (k) => {
    if (window.confirm("Are you sure you want to delete this Log?")) {
      k = parseInt(k);
      try {
        await axiosInstance.delete(`/delete/${k}`);
        alert("log Group deleted successfully");
        navigate("/home");
      } catch (err) {
        console.error("Error deleting group:", err);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const name = await axiosInstance.get(`/findgroupname/${segment}`);
        setGname(name.data);

        const amount = await axiosInstance.get(`/findtotal/${segment}`);
        setAmount(amount.data);

        const usep = await axiosInstance.get(`/findalluser/${segment}`);
        setUser(usep.data);

        const data = await axiosInstance.get(`/findlog/${segment}`);
        setarray(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
    window.addEventListener("refreshLogs", fetchLogs);
    return () => {
      window.removeEventListener("refreshLogs", fetchLogs);
    };
  }, []);

  return (
    <div className="gbox flex-grow mt-14 mb-32 p-4">
      {<AddButton />}

      <Gdt1 segment={segment} gname={gname} amount={amount} />

      <div className="mid overflow-x-auto">
        <div className="logs">
          <table className="log-table min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Paid By</th>
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-left">Participants</th>
                <th className="py-2 px-4 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {array.slice(0, num).map((log) => (
                <tr
                  key={log.id}
                  className={`border-b cursor-pointer hover:bg-gray-100 ${
                    log.isDeleted ? "bg-red-100" : ""
                  }`}
                  onClick={async () => {
                    try {
                      const res = await axiosInstance.get(
                        `/findsinglelog/${log.id}`
                      );
                      //console.log(res.data);
                      setSelectedLog(res.data); // assuming it returns the full JSON structure
                    } catch (err) {
                      showAlert("Failed to load log details", "danger");
                    }
                  }}
                >
                  <td className="py-2 px-4">
                    <button className="name-btn">
                      {log.paidBy.map((item) => item).join(", ")}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button className="name-btn">
                      {log.items.map((item) => item).join(", ")}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button className="name-btn">
                      {log.participants.map((p) => p).join(", ")}
                    </button>
                  </td>
                  <td className="py-2 px-4">{log.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="show-more text-center mt-2 text-blue-500 cursor-pointer"
            onClick={() => {
              num === array.length ? setnum(7) : setnum(array.length);
            }}
          >
            {array.length > 7 && num !== array.length && "Show More..."}
            {num === array.length && "Show Less..."}
          </div>
        </div>
      </div>

      <UserList users={users}></UserList>

      {selectedLog && (
        <Modal title="Expense Details" onClose={() => setSelectedLog(null)}>
          <div className="space-y-3 text-sm max-h-[60vh] overflow-y-auto">
            <p>
              <strong>Description:</strong> {selectedLog.description}
            </p>
            <p>
              <strong>Total:</strong> ₹{selectedLog.totalMoney}
            </p>
            <p>
              <strong>Tax:</strong> ₹{selectedLog.tax}
            </p>
            <p>
              <strong>Group ID:</strong> {selectedLog.groupId}
            </p>

            <div>
              <h3 className="font-semibold mt-2">Payers:</h3>
              <ul className="list-disc list-inside">
                {selectedLog.payers.map((payer, i) => (
                  <li key={i}>
                    {payer.name} paid ₹{payer.amount}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mt-2">Items:</h3>
              {selectedLog.items.map((item, i) => (
                <div key={i} className="border-t pt-2 mt-2">
                  <p>
                    <strong>{item.itemName}</strong> - ₹{item.unitPrice} x{" "}
                    {item.quantity}
                  </p>
                  <p className="text-xs text-gray-600">Consumers:</p>
                  <ul className="list-disc list-inside text-xs ml-4">
                    {item.consumers.map((c, j) => (
                      <li key={j}>
                        {c.name} - Qty: {c.quantity}, Shared: {c.isShared}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <button className="" onClick={() => handleLogdel(selectedLog.id)}>
            <Trash2 size={20} />
          </button>
        </Modal>
      )}
    </div>
  );
};

export default GroupDashboard;
