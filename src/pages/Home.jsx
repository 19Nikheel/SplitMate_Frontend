import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import { useNavigate } from "react-router-dom";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-sm relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      {children}
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const [latestCreatedRooms, setLatestCreatedRooms] = useState([]);
  const [latestJoinedGroups, setLatestJoinedGroups] = useState([]);

  const [modalType, setModalType] = useState(null); // "createRoom", "sendRequest", "joinRoom", "becomeMember"
  const [inputValue, setInputValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace dummy data with API calls
        const createdRooms = [
          { id: "CR001", name: "Dinner Party" },
          { id: "CR002", name: "Project Meeting" },
          { id: "CR003", name: "Birthday Prep" },
          { id: "CR004", name: "Trip Plan" },
          { id: "CR005", name: "Study Group" },
        ];

        const joinedGroups = [
          { id: "JG001", name: "Roommates" },
          { id: "JG002", name: "Friends Trip" },
          { id: "JG003", name: "Office Team" },
          { id: "JG004", name: "Family Group" },
          { id: "JG005", name: "Startup Crew" },
        ];

        setLatestCreatedRooms(createdRooms);
        setLatestJoinedGroups(joinedGroups);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!inputValue) {
      alert("Please enter required input.");
      return;
    }

    console.log(`Submitting ${modalType}:`, inputValue);
    setInputValue("");
    setModalType(null);
  };

  const handleBecomeMember = () => {
    if (!mobileNumber || !newPassword) {
      alert("Please fill both fields.");
      return;
    }

    console.log("Registering as member:", mobileNumber, newPassword);
    setMobileNumber("");
    setNewPassword("");
    setModalType(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to SplitMate
      </h1>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded shadow"
          onClick={() => setModalType("createRoom")}
        >
          Create Room
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded shadow"
          onClick={() => setModalType("sendRequest")}
        >
          Send Request
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded shadow"
          onClick={() => setModalType("joinRoom")}
        >
          Join
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded shadow"
          onClick={() => setModalType("becomeMember")}
        >
          Become a Member
        </button>
      </div>

      {/* Latest Created Rooms */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Latest Created Rooms</h2>
        <div className="bg-gray-50 rounded p-3 space-y-2 shadow">
          {latestCreatedRooms.length > 0 ? (
            latestCreatedRooms.map((room) => (
              <div
                key={room.id}
                className="p-3 bg-white rounded shadow-sm flex justify-between items-center hover:bg-gray-100"
              >
                <span>{room.name}</span>
                <button
                  className="text-blue-600 text-sm font-medium"
                  onClick={() => navigate(`/hosted/${room.id}`)}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No rooms created yet.</p>
          )}
        </div>
      </div>

      {/* Latest Joined Groups */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Latest Joined Groups</h2>
        <div className="bg-gray-50 rounded p-3 space-y-2 shadow">
          {latestJoinedGroups.length > 0 ? (
            latestJoinedGroups.map((group) => (
              <div
                key={group.id}
                className="p-3 bg-white rounded shadow-sm flex justify-between items-center hover:bg-gray-100"
              >
                <span>{group.name}</span>
                <button
                  className="text-green-600 text-sm font-medium"
                  onClick={() => navigate(`/group/${group.id}`)}
                >
                  Open
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No groups joined yet.</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {modalType && modalType !== "becomeMember" && (
        <Modal title={`Enter ${modalType}`}>
          <input
            type="text"
            placeholder={`Enter ${modalType} input`}
            className="w-full p-2 border rounded mb-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Modal>
      )}

      {modalType === "becomeMember" && (
        <Modal title="Become a Member" onClose={() => setModalType(null)}>
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-2 border rounded mb-3"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded"
            onClick={handleBecomeMember}
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Home;
