import React, { useState } from "react";
import Button from "./Button";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 13, name: "Alice" },
  { id: 23, name: "Bob" },
  { id: 33, name: "Charlie" },
];

const AddExpenseMobile = () => {
  const { show, setShows } = useStateContext();
  const [addedItems, setAddedItems] = useState([]);
  // const [showInitial, setShows] = useState(initialState.add);
  const [paymentType, setPaymentType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [payerInputs, setPayerInputs] = useState({}); // toggles input visibility for each user
  const [payerAmounts, setPayerAmounts] = useState({}); // stores temp input amount for each user
  const [payers, setPayers] = useState([]); // confirmed payers
  const [totalPaid, setTotalPaid] = useState(0); // sum of all confirmed amounts

  const [quantities, setQuantities] = useState(
    users.reduce((acc, user) => ({ ...acc, [user.id]: 0 }), {})
  );

  const handleQuantity = (userId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [userId]: Math.max(prev[userId] + delta, 0),
    }));
  };

  const togglePayerInput = (userId) => {
    setPayerInputs((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handlePayerAmount = (userId, amount) => {
    setPayerAmounts((prev) => ({
      ...prev,
      [userId]: amount,
    }));
  };
  const confirmPayerAmount = (userId) => {
    const amount = parseFloat(payerAmounts[userId]);

    if (!isNaN(amount) && amount > 0) {
      // Avoid duplicate entries for the same user
      setPayers((prev) => {
        const updated = prev.filter((p) => p.userId !== userId);
        return [...updated, { userId, amount }];
      });

      // Update total
      setTotalPaid((prevTotal) => {
        const previousAmount =
          payers.find((p) => p.userId === userId)?.amount || 0;
        return prevTotal - previousAmount + amount;
      });

      // Hide input
      setPayerInputs((prev) => ({
        ...prev,
        [userId]: false,
      }));
    }
  };

  const bill = () => {
    return price * Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleAddItem = () => {
    if (!item || !price) return;

    const consumers = users
      .filter((u) => quantities[u.id] > 0)
      .map((u) => u.id);

    if (consumers.length === 0) return;

    const newItem = {
      name: item,
      price: parseFloat(price),
      consumers,
    };

    setAddedItems([...addedItems, newItem]);
    setItem("");
    setPrice("");
    setQuantities(users.reduce((acc, user) => ({ ...acc, [user.id]: 0 }), {}));
  };

  const handleOnClick = () => {
    console.log("hui");
    setAddedItems([]);
    setShowForm(false);
    setPaymentType(null);
    setItem("");
    setPrice("");
    setPayerInputs({});
    setPayerAmounts({});
    setPayers([]);
    setTotalPaid(0);

    setQuantities(users.reduce((acc, user) => ({ ...acc, [user.id]: 0 }), {}));
  };

  const handleSubmit = () => {
    console.log(addedItems);

    const payload = {
      paymentType,
      addedItems,
    };

    console.log("Expense Submitted:", payload);
    setAddedItems([]);
    setShowForm(false);
    setPaymentType(null);
    setItem("");
    setPrice("");
    setPayerInputs({});
    setPayerAmounts({});
    setPayers([]);
    setTotalPaid(0);

    setQuantities(users.reduce((acc, user) => ({ ...acc, [user.id]: 0 }), {}));
  };

  return (
    <div className="p-4">
      {/* First Modal: Choose Full or Partial */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Select Payment Type
            </h2>
            <div className="flex justify-around">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setPaymentType("full");
                  setShows(false);
                  setShowForm(true);
                }}
              >
                Full
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setPaymentType("Partial");
                  setShows(false);
                  setShowForm(true);
                }}
              >
                Partial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal: Expense Details */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-30 overflow-auto">
          <div className="bg-white p-6 rounded-md shadow-md w-11/12 max-w-sm">
            <div className="justify-self-end">
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(153, 171, 180)"
                bgHoverColor="light-gray"
                size="2xl"
                borderRadius="50%"
                HandleOnSubmit={handleOnClick}
                H="f"
              />
            </div>

            <h2 className="text-lg font-semibold text-center mb-4">
              Add Expense ({paymentType})
            </h2>

            {/* Display added items */}
            {addedItems.length > 0 && (
              <div className="mb-4 space-y-2">
                {addedItems.map((item, idx) => (
                  <div key={idx} className="p-2 border rounded bg-gray-100">
                    <div className="font-semibold">
                      {item.name} - ₹{item.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      Consumers:{" "}
                      {item.consumers
                        .map((id) => users.find((user) => user.id === id)?.name)
                        .join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Item Name"
              className="w-full p-2 border rounded mb-2"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <input
              type="number"
              placeholder="Unit Price"
              className="w-full p-2 border rounded mb-4"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-7 h-7 bg-gray-200 rounded-full"
                      onClick={() => handleQuantity(user.id, -1)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">
                      {quantities[user.id]}
                    </span>
                    <button
                      className="w-7 h-7 bg-gray-200 rounded-full"
                      onClick={() => handleQuantity(user.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {paymentType === "Partial" && (
              <div className="mt-6">
                <p className="font-medium mb-2">Select Payers:</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {users.map((user) => (
                    <div key={user.id}>
                      <button
                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                        onClick={() => togglePayerInput(user.id)}
                      >
                        {user.name}
                      </button>
                      {payerInputs[user.id] && (
                        <div className="flex mt-2 items-center gap-2">
                          <input
                            type="number"
                            placeholder="Amount paid"
                            className="p-1 border rounded w-24"
                            value={payerAmounts[user.id] || ""}
                            onChange={(e) =>
                              handlePayerAmount(user.id, e.target.value)
                            }
                          />
                          <button
                            className="bg-green-500 text-white text-sm px-2 py-1 rounded"
                            onClick={() => confirmPayerAmount(user.id)}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* {totalPaid > 0 && (
              <div className="mt-4 text-sm font-medium">
                Total Amount Paid: ₹{totalPaid.toFixed(2)}
              </div>
            )} */}

            <div className="mt-6 flex gap-2">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded w-1/2"
                onClick={handleAddItem}
              >
                Add Item
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-1/2"
                onClick={handleSubmit}
              >
                Submit Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpenseMobile;
