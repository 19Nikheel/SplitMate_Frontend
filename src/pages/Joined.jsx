import React, { useState, useMemo } from "react";
import { employeesData } from "../data/dummy";
import { Header } from "../components";
import { TiDelete } from "react-icons/ti";
import { useLocation } from "react-router-dom";

const Joined = () => {
  const loc = useLocation().pathname.slice(1);

  const [data, setData] = useState(employeesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.EmployeeImage}
        alt="employee"
      />
      <p>{props.Name}</p>
    </div>
  );

  const tabGrid = [
    {
      field: "Group_Name",
      headerText: "Squad",
      width: "150",
      template: gridEmployeeProfile,
      textAlign: "Center",
    },
    {
      field: "Group_Id",
      headerText: "Squad Id",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Date",
      headerText: "Date",
      width: "135",
      format: "yMd",
      textAlign: "Center",
    },

    {
      field: "Admin",
      headerText: "Admin",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "Expiry_Date",
      headerText: "Expiry Date",
      width: "125",
      textAlign: "Center",
    },
  ];

  const sortedData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key === "Date") {
      filtered.sort((a, b) => {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);

        if (dateA < dateB) return sortConfig.direction === "asc" ? -1 : 1;
        if (dateA > dateB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = (index) => {
    console.log(loc);

    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-1 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs md:text-sm">
          <thead>
            <tr>
              {tabGrid.map((col) => (
                <th
                  key={col.field}
                  onClick={
                    col.field === "Date"
                      ? () => handleSort(col.field)
                      : undefined
                  }
                  className="cursor-pointer px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  {col.headerText}{" "}
                  {sortConfig.key === col.field
                    ? sortConfig.direction === "asc"
                      ? "🔼"
                      : "🔽"
                    : ""}
                </th>
              ))}

              {loc !== "joined" && (
                <th className="px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, i) => {
              const realIndex = (currentPage - 1) * pageSize + i;
              return (
                <tr key={i} className="hover:bg-gray-50">
                  {tabGrid.map((col) => (
                    <td key={col.field} className="px-4 py-2 whitespace-nowrap">
                      {item[col.field]}
                    </td>
                  ))}

                  {loc !== "joined" && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(realIndex)}
                        className="text-red-500 text-2xl p-2 hover:bg-red-100 rounded-full"
                      >
                        {<TiDelete />}
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Joined;
