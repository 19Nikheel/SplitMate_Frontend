import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const AddButton = () => {
  const { setShows } = useStateContext();
  return (
    <div className="fixed bottom-24 right-3 z-50 flex flex-col gap-3">
      <button
        onClick={setShows}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 px-4 shadow-lg flex flex-col items-center"
      >
        <span className="text-xl">+</span>
        <span className="text-xs mt-1">Add</span>
      </button>
    </div>
  );
};

export default AddButton;
