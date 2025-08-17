import React, { useState } from "react";
// import {
//   TodoComponent,
//   ColumnsDirective,
//   ColumnDirective,
// } from "@syncfusion/ej2-react-Todo";
import { TiDelete } from "react-icons/ti";

import { Header } from "../components";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="mx-2 md:mx-10 mt-24 p-2 md:p-10 bg-white rounded-3xl w-full md:w-10/12 lg:w-8/12 xl:w-7/12">
        <Header category="App" title="Todo" />

        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 my-2 rounded"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                className={`flex-grow cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                {<TiDelete />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// }(
//   <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//     <Header category="App" title="Todo" />

//   </div>
// );

export default Todo;
