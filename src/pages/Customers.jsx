// import React from "react";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Selection,
//   Inject,
//   Edit,
//   Toolbar,
//   Sort,
//   Filter,
// } from "@syncfusion/ej2-react-grids";

// import { customersData, customersGrid } from "../data/dummy";
// import { Header } from "../components";
// import { useParams } from "react-router-dom";

// const Customers = () => {
//   const { id } = useParams();

//   const selectionsettings = { persistSelection: true };
//   const toolbarOptions = ["Delete"];
//   const editing = { allowDeleting: true, allowEditing: true };

//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//       <Header title="Users" />
//       <GridComponent
//         dataSource={customersData}
//         enableHover={false}
//         allowPaging
//         pageSettings={{ pageCount: 5 }}
//         selectionSettings={selectionsettings}
//         toolbar={toolbarOptions}
//         editSettings={editing}
//         allowSorting
//       >
//         <ColumnsDirective>
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {customersGrid.map((item, index) => (
//             <ColumnDirective key={index} {...item} />
//           ))}
//         </ColumnsDirective>
//         <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
//       </GridComponent>
//     </div>
//   );
// };

// export default Customers;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Customers = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const dummy = [
    {
      name: "Nirav Joshi",
      email: "nirav@gmail.com",
      project: "Hosting Press HTML",
      status: "Active",
      weeks: 40,
      budget: "$2.4k",
      location: "India",
      customerId: "1001",
    },
    {
      name: "Sunil Joshi",
      email: "sunil@gmail.com",
      project: "Elite Admin",
      status: "Active",
      weeks: 11,
      budget: "$3.9k",
      location: "India",
      customerId: "1002",
    },
    {
      name: "Andrew McDowell",
      email: "andrew@gmail.com",
      project: "Real Homes WP Theme",
      status: "Pending",
      weeks: 19,
      budget: "$24.5k",
      location: "USA",
      customerId: "1003",
    },
    {
      name: "Christopher Jamil",
      email: "jamil@gmail.com",
      project: "MedicalPro WP Theme",
      status: "Completed",
      weeks: 34,
      budget: "$16.5k",
      location: "USA",
      customerId: "1004",
    },
    {
      name: "Michael",
      email: "michael@gmail.com",
      project: "Weekly WP Theme",
      status: "Cancel",
      weeks: 34,
      budget: "$16.5k",
      location: "USA",
      customerId: "1005",
    },
    {
      name: "Alex Johnson",
      email: "alex.j@gmail.com",
      project: "Startup Admin",
      status: "Active",
      weeks: 21,
      budget: "$9.3k",
      location: "Canada",
      customerId: "1006",
    },
    {
      name: "Sara Lee",
      email: "sara@gmail.com",
      project: "Portfolio Site",
      status: "Completed",
      weeks: 12,
      budget: "$5.1k",
      location: "UK",
      customerId: "1007",
    },
    {
      name: "Rajesh Patel",
      email: "rajesh@gmail.com",
      project: "Ecommerce Frontend",
      status: "Pending",
      weeks: 25,
      budget: "$18.0k",
      location: "India",
      customerId: "1008",
    },
    {
      name: "Emily Brown",
      email: "emily@gmail.com",
      project: "Mobile App UX",
      status: "Active",
      weeks: 30,
      budget: "$12.5k",
      location: "USA",
      customerId: "1009",
    },
    {
      name: "Daniel Smith",
      email: "daniel@gmail.com",
      project: "Design System",
      status: "Completed",
      weeks: 15,
      budget: "$10.2k",
      location: "Australia",
      customerId: "1010",
    },
  ];
  const [data, setData] = useState(dummy);
  // Fetch data from backend based on ID
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`/api/groups/${id}`); // adjust endpoint as needed
  //       const result = await res.json();
  //       setData(result); // expecting an array of customer objects
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  //if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700 font-semibold">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Project Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Weeks</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
              <td className="px-4 py-2">{user.project}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    user.status === "Active"
                      ? "bg-green-500"
                      : user.status === "Pending"
                      ? "bg-yellow-500"
                      : user.status === "Completed"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                ></span>
                {user.status}
              </td>
              <td className="px-4 py-2">{user.weeks}</td>
              <td className="px-4 py-2">{user.budget}</td>
              <td className="px-4 py-2">{user.location}</td>
              <td className="px-4 py-2">{user.customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
