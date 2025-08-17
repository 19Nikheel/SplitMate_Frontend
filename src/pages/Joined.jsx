import React, { useState, useMemo, useEffect } from "react";
import { Header } from "../components";
import { TiDelete } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Joined = () => {
  const loc = useLocation().pathname.slice(1);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [data1, setData2] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]);
        setData2([]);
        setSearchTerm("");
        setSortConfig({ key: "", direction: "asc" });
        setCurrentPage(1);

        if (loc !== "joined") {
          const response = await axiosInstance.get("/findmygroups");
          setData(response.data);
        } else {
          const response = await axiosInstance.get("/findothergroups");
          setData2(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loc]);

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
      field: "groupName",
      headerText: "Squad",
      width: "150",
      template: gridEmployeeProfile,
      textAlign: "Center",
    },
    {
      field: "groupId",
      headerText: "Squad Id",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "dateOfCreation",
      headerText: "Date",
      width: "135",
      format: "yMd",
      textAlign: "Center",
    },

    {
      field: "adminList",
      headerText: "Admin",
      width: "120",
      textAlign: "Center",
    },
  ];

  const sortedData = useMemo(() => {
    let filtered = loc === "hosted" ? [...data] : [...data1];

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
  }, [data, data1, loc, searchTerm, sortConfig]);

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

  // const handleDelete = (index) => {
  //   console.log(loc);

  //   const updated = [...data];
  //   updated.splice(index, 1);
  //   setData(updated);
  // };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title={loc === "joined" ? "Joined" : "Hosted"} />

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
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, i) => {
              const realIndex = (currentPage - 1) * pageSize + i;
              return (
                <tr
                  key={i}
                  className="hover:bg-gray-50"
                  onClick={() => navigate(`/${loc}/${item.groupId}`)}
                >
                  {tabGrid.map((col) => (
                    <td key={col.field} className="px-4 py-2 whitespace-nowrap">
                      {item[col.field]}
                    </td>
                  ))}
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
