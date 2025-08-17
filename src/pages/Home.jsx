import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axiosInstance, { axiosAuth } from "../api/axiosInstance";
import { useUser } from "../contexts/UserProvider";
import { useAlert } from "../contexts/AlertContext";

export default function Home() {
  const navigate = useNavigate();
  const { role } = useUser();
  const { showAlert } = useAlert();

  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showSendRequest, setShowSendRequest] = useState(false);
  const [showBecomeMember, setShowBecomeMember] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [phone, setPhone] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [hostedGroups, setHostedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const hostedRes = await axiosInstance.get(`/findmygroups`);
        setHostedGroups(hostedRes.data.slice(0, 5));

        const joinedRes = await axiosInstance.get(`/findothergroups`);
        setJoinedGroups(joinedRes.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching groups:", err);
        showAlert(`Error fetching groups:${err}`, "danger");
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    try {
      const res = await axiosInstance.post(`/group?groupName=${groupName}`);
      if (res.status === 200) {
        navigate(`/hosted/${res.data}`);
      }
    } catch (err) {
      showAlert(`Error fetching groups:${err}`, "danger");
    }
  };

  const handleSendRequest = async () => {
    try {
      const res = await axiosInstance.post(`/send-request?groupId=${groupId}`);
      if (res.status === 200) {
        alert("Request sent successfully");
        setGroupId("");
        setShowSendRequest(false);
      } else {
        showAlert(`Error fetching groups`, "danger");
      }
    } catch (err) {
      showAlert(`Error fetching groups`, "danger");
    }
  };

  const handleBecomeMember = async () => {
    if (newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axiosInstance.post("/becomemember", {
        phone,
        password: newPass,
      });
      if (res.status === 200) {
        alert("Member created successfully");
        setPhone("");
        setNewPass("");
        setConfirmPass("");
        setShowBecomeMember(false);
      }
    } catch (err) {
      console.error("Error becoming member:", err);
    }
  };

  const closeModal = (setter) => {
    setter(false);
    setGroupName("");
    setGroupId("");
    setPhone("");
    setNewPass("");
    setConfirmPass("");
  };

  const openGroupDashboard = (grouId) => {
    navigate(`/joined/${grouId}`);
  };

  const openHGroupDashboard = (grouId) => {
    navigate(`/hosted/${grouId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Buttons in horizontal line */}
      <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-4 mb-8">
        <button
          className="flex-1 bg-blue-500 text-white px-6 py-4 rounded-xl text-lg"
          onClick={() => setShowCreateGroup(true)}
        >
          Create Group
        </button>

        <button
          className="flex-1 bg-green-500 text-white px-6 py-4 rounded-xl text-lg"
          onClick={() => setShowSendRequest(true)}
        >
          Send Request
        </button>

        {role == "GUEST_MEMBER" && (
          <button
            className="flex-1 bg-purple-500 text-white px-6 py-4 rounded-xl text-lg"
            onClick={() => setShowBecomeMember(true)}
          >
            Become Member
          </button>
        )}
      </div>

      {/* Hosted Groups Table */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">Your Hosted Groups</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Group Name</th>
              </tr>
            </thead>
            <tbody>
              {hostedGroups.map((group) => (
                <tr
                  key={group.groupId}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => openHGroupDashboard(group.groupId)}
                >
                  <td className="py-2 px-4">{group.groupName}</td>
                </tr>
              ))}
              {hostedGroups.length === 0 && (
                <tr>
                  <td className="py-2 px-4 text-gray-500">
                    No hosted groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Joined Groups Table */}
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Joined Groups</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Group Name</th>
              </tr>
            </thead>
            <tbody>
              {joinedGroups.map((group) => (
                <tr
                  key={group.dateOfCreation}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => openGroupDashboard(group.groupId)}
                >
                  <td className="py-2 px-4">{group.groupName}</td>
                </tr>
              ))}
              {joinedGroups.length === 0 && (
                <tr>
                  <td className="py-2 px-4 text-gray-500">
                    No joined groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showCreateGroup && (
        <Modal onClose={() => closeModal(setShowCreateGroup)}>
          <h2 className="text-lg font-bold mb-4">Create Group</h2>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full border p-2 mb-4"
          />
          <button
            onClick={handleCreateGroup}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </Modal>
      )}

      {showSendRequest && (
        <Modal onClose={() => closeModal(setShowSendRequest)}>
          <h2 className="text-lg font-bold mb-4">Send Group Request</h2>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Enter group ID"
            className="w-full border p-2 mb-4"
          />
          <button
            onClick={handleSendRequest}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </Modal>
      )}

      {showBecomeMember && (
        <Modal onClose={() => closeModal(setShowBecomeMember)}>
          <h2 className="text-lg font-bold mb-4">Become Member</h2>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border p-2 mb-4"
          />
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Enter new password"
            className="w-full border p-2 mb-4"
          />
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm password"
            className="w-full border p-2 mb-4"
          />
          <button
            onClick={handleBecomeMember}
            className="bg-purple-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
}

// Modal Component
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 relative w-80">
        <X
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
