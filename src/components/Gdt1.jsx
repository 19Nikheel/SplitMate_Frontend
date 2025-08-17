import { Trash2, Clipboard, MoreHorizontal, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../components/GroupDashboard.css";
import axiosInstance from "../api/axiosInstance";
import Modal from "./Modal";
import { useAlert } from "../contexts/AlertContext";

const Gdt1 = ({ segment, gname, amount }) => {
  const [showSettlement, setShowSettlement] = useState(false);
  const [settlements, setSettlements] = useState([]);
  const { showAlert } = useAlert();

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleGetGroupId = async () => {
    try {
      const fetch = await axiosInstance.get(`/findgroupId/${segment}`);
      showAlert(`GroupID :- ${fetch.data}`, "info");
    } catch (err) {
      showAlert(`${err.response.data}`, "danger");
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axiosInstance.delete(`/group/${segment}`);
        alert("Group deleted successfully");
        navigate("/home");
      } catch (err) {
        console.error("Error deleting group:", err);
      }
    }
  };

  const handleShowSettlement = async () => {
    try {
      const res = await axiosInstance.get(`/findsettlement/${segment}`);
      setSettlements(res.data);
      setShowSettlement(true);
    } catch (err) {
      console.error("Error fetching settlement:", err);
      showAlert(`${err.response.data}`, "danger");
    }
  };

  const handleShowRequests = async () => {
    try {
      const res = await axiosInstance.get(`/findRequestList/${segment}`);
      setRequests(res.data);
      setShowRequests(true);
    } catch (err) {
      console.error("Error fetching requests:", err);
      showAlert(`${err.response.data}`, "danger");
    }
  };

  const handleAcceptRequest = async (req) => {
    try {
      await axiosInstance.post(
        `/accept-request?groupId=${segment}&name=${req}`
      );

      showAlert("Request accepted!", "success");
      // Refresh requests list after accepting:
      handleShowRequests();
    } catch (err) {
      console.error("Error accepting request:", err);
      showAlert(`${err.response.data}`, "danger");
    }
  };

  return (
    <>
      <div className="header flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded shadow p-4 mb-4">
        <div className="lbox text-xl font-semibold">{gname}</div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleGetGroupId}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            title="Get Group ID"
          >
            <Clipboard size={20} />
          </button>

          {/* <button
            onClick={handleDeleteGroup}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            title="Delete Group"
          >
            <Trash2 size={20} />
          </button> */}

          <button
            onClick={handleShowSettlement}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
            title="Show Settlement"
          >
            <MoreHorizontal size={20} />
          </button>

          <button
            onClick={handleShowRequests}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
            title="Show Requests"
          >
            <UserPlus size={20} />
          </button>
        </div>

        <div className="rbox text-lg font-medium text-orange-600">
          Total Expense: {amount}
        </div>
      </div>

      {showSettlement && (
        <Modal
          title="Settlement Details"
          onClose={() => setShowSettlement(false)}
        >
          {settlements.length === 0 && (
            <p className="text-gray-500">No settlements found.</p>
          )}
          {settlements.map((s, index) => (
            <div
              key={index}
              className="border p-2 mb-2 rounded flex flex-col text-sm"
            >
              <span>
                <strong>From:</strong> {s.from}
              </span>
              <span>
                <strong>To:</strong> {s.to}
              </span>
              <span>
                <strong>Amount:</strong> ₹{s.amount}
              </span>
            </div>
          ))}
        </Modal>
      )}

      {showRequests && (
        <Modal title="Pending Requests" onClose={() => setShowRequests(false)}>
          {requests.length === 0 && (
            <p className="text-gray-500">No requests found.</p>
          )}
          {requests.map((req, index) => (
            <div
              key={index}
              className="border p-2 mb-2 rounded flex flex-col text-sm"
            >
              <span>
                <strong>User:</strong> {req}
              </span>
              <button
                onClick={() => handleAcceptRequest(req)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
};

export default Gdt1;
