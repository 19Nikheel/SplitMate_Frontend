import React, { useState } from "react";
import axios from "axios";
import { MdOutlineCancel, MdDelete } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const AddExpenseMobile = () => {
  const { show, setShows } = useStateContext();
  const { groupId } = useParams();
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [payer, setPayer] = useState(null);
  const [partialPayers, setPartialPayers] = useState({});
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantities, setQuantities] = useState({});
  const [shared, setShared] = useState({});
  const [sharedCounts, setSharedCounts] = useState({});

  const handlePartialAmount = (userId, amount) => {
    setPartialPayers((prev) => ({
      ...prev,
      [userId]: parseFloat(amount) || 0,
    }));
  };

  const handleQuantity = (userId, qty) => {
    setQuantities((prev) => ({
      ...prev,
      [userId]: Math.max(parseInt(qty) || 0, 0),
    }));
  };

  const toggleShared = (userId) => {
    setShared((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleSharedCount = (userId, count) => {
    setSharedCounts((prev) => ({
      ...prev,
      [userId]: parseInt(count) || 0,
    }));
  };

  const handleAddItem = () => {
    if (!itemName || !unitPrice) return;

    const consumers = users
      .filter((u) => quantities[u.id] > 0)
      .map((u) => ({
        name: u.name,
        quantity: shared[u.id]
          ? quantities[u.id] / (sharedCounts[u.id] || 1)
          : quantities[u.id],
        isShared: shared[u.id] ? sharedCounts[u.id] || 1 : 0,
      }));

    const totalItemCost =
      parseFloat(unitPrice) * consumers.reduce((sum, c) => sum + c.quantity, 0);

    setItems((prev) => [
      ...prev,
      {
        itemName,
        unitPrice: parseFloat(unitPrice),
        quantity: consumers.reduce((sum, c) => sum + c.quantity, 0),
        consumers,
        totalItemCost,
      },
    ]);

    setItemName("");
    setUnitPrice("");
    setQuantities({});
    setShared({});
    setSharedCounts({});
  };

  const deleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalBill = items.reduce((sum, item) => sum + item.totalItemCost, 0);
  const remainingAmount = parseFloat(totalAmount) - totalBill;
  const tax = remainingAmount >= 0 ? remainingAmount : 0;

  const handleSubmit = async () => {
    if (!description || !totalAmount || items.length === 0) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const payload = {
      description,
      totalMoney: parseFloat(totalAmount),
      tax,
      groupId: groupId || "Test1",
      payers:
        paymentType === "Full"
          ? [{ name: payer, amount: parseFloat(totalAmount) }]
          : users
              .filter((u) => partialPayers[u.id] > 0)
              .map((u) => ({
                name: u.name,
                amount: partialPayers[u.id],
              })),
      items,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await axiosInstance.post("/api/post", payload);
      console.log("Expense saved:", res.data);
      // Reset all
      setShows(false);
      setStep(1);
      setDescription("");
      setTotalAmount("");
      setPaymentType("");
      setPayer(null);
      setPartialPayers({});
      setItems([]);
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <div className="p-4">
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20 overflow-auto">
          <div className="bg-white p-4 rounded-md shadow-md w-11/12 max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setStep(1);
                setShows(false);
              }}
            >
              <MdOutlineCancel size={24} />
            </button>

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Add Expense
                </h2>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border rounded mb-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Total Amount"
                  className="w-full p-2 border rounded mb-4"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />

                <div className="flex justify-around mb-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (!description || !totalAmount) {
                        alert("Please enter description and total amount.");
                        return;
                      }
                      setPaymentType("Full");
                      setStep(2);
                    }}
                  >
                    Full
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (!description || !totalAmount) {
                        alert("Please enter description and total amount.");
                        return;
                      }
                      setPaymentType("Partial");
                      setStep(2);
                    }}
                  >
                    Partial
                  </button>
                </div>
              </>
            )}

            {step === 2 && paymentType === "Full" && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  Who Paid?
                </h3>
                <div className="flex justify-center gap-4 mb-4">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      className={`w-12 h-12 rounded-full border ${
                        payer === u.name ? "bg-green-500 text-white" : ""
                      }`}
                      onClick={() => setPayer(u.name)}
                    >
                      {u.name[0]}
                    </button>
                  ))}
                </div>
                <button
                  className="bg-blue-600 text-white w-full py-2 rounded"
                  onClick={() => {
                    if (!payer) {
                      alert("Please select a payer.");
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && paymentType === "Partial" && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  Enter Paid Amounts
                </h3>
                {users.map((u) => (
                  <div key={u.id} className="flex justify-between mb-2">
                    <span>{u.name}</span>
                    <input
                      type="number"
                      className="border p-1 rounded w-24"
                      value={partialPayers[u.id] || ""}
                      onChange={(e) =>
                        handlePartialAmount(u.id, e.target.value)
                      }
                    />
                  </div>
                ))}
                <div className="text-center mb-2">
                  <span className="font-medium">Total Entered: </span>₹
                  {Object.values(partialPayers).reduce(
                    (sum, val) => sum + val,
                    0
                  )}
                </div>
                <button
                  className="bg-blue-600 text-white w-full py-2 rounded mt-2"
                  onClick={() => {
                    const totalEntered = Object.values(partialPayers).reduce(
                      (sum, val) => sum + val,
                      0
                    );
                    if (totalEntered !== parseFloat(totalAmount)) {
                      alert("Total payer amount must equal total amount.");
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Next
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  Add Items
                </h3>
                <input
                  type="text"
                  placeholder="Item Name"
                  className="w-full p-2 border rounded mb-2"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  className="w-full p-2 border rounded mb-4"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />

                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <span className="w-20">{u.name}</span>
                    <button
                      className={`w-16 px-2 py-1 rounded ${
                        shared[u.id] ? "bg-green-200" : "bg-gray-200"
                      }`}
                      onClick={() => toggleShared(u.id)}
                    >
                      Shared: {shared[u.id] ? "Yes" : "No"}
                    </button>
                    {shared[u.id] && (
                      <input
                        type="number"
                        placeholder="Count"
                        className="w-16 border p-1 rounded"
                        value={sharedCounts[u.id] || ""}
                        onChange={(e) =>
                          handleSharedCount(u.id, e.target.value)
                        }
                      />
                    )}
                    <input
                      type="number"
                      placeholder="Qty"
                      className="w-16 border p-1 rounded"
                      value={quantities[u.id] || ""}
                      onChange={(e) => handleQuantity(u.id, e.target.value)}
                    />
                  </div>
                ))}

                <button
                  className="bg-gray-500 text-white w-full py-2 rounded mb-2"
                  onClick={handleAddItem}
                >
                  Add Item
                </button>

                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
                  >
                    <div>
                      {item.itemName} - ₹{item.totalItemCost.toFixed(2)}
                    </div>
                    <button onClick={() => deleteItem(idx)}>
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                ))}

                <div
                  className={`rounded p-2 mb-2 flex justify-between items-center ${
                    totalBill > parseFloat(totalAmount)
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-100"
                  }`}
                >
                  <div>
                    <span className="font-medium">Total Bill: </span>₹
                    {totalBill.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Left: </span>₹
                    {remainingAmount.toFixed(2)}
                  </div>
                </div>

                <button
                  className="bg-green-600 text-white w-full py-2 rounded"
                  onClick={handleSubmit}
                  disabled={
                    totalBill > parseFloat(totalAmount) ||
                    parseFloat(totalAmount) <= 0
                  }
                >
                  Submit Expense
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpenseMobile;
