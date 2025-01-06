import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { FaCodePullRequest } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
// Data for Recharts chart
const rechartsData = [
  { name: "January", uv: 4000, pv: 2400, amt: 2400, year: "2023" },
  { name: "February", uv: 3000, pv: 1398, amt: 2210, year: "2023" },
  { name: "March", uv: 2000, pv: 9800, amt: 2290, year: "2023" },
  { name: "April", uv: 2780, pv: 3908, amt: 2000, year: "2023" },
  { name: "May", uv: 1890, pv: 4800, amt: 2181, year: "2023" },
  { name: "June", uv: 2390, pv: 3800, amt: 2500, year: "2023" },
  { name: "July", uv: 3490, pv: 4300, amt: 2100, year: "2023" },
  { name: "August", uv: 2000, pv: 4300, amt: 2100, year: "2023" },
  { name: "September", uv: 2500, pv: 4300, amt: 2100, year: "2023" },
  { name: "October", uv: 2100, pv: 4300, amt: 2100, year: "2023" },
  { name: "November", uv: 1500, pv: 4300, amt: 2100, year: "2023" },
  { name: "December", uv: 1234, pv: 4300, amt: 2100, year: "2023" },
  { name: "January", uv: 1500, pv: 4300, amt: 2100, year: "2024" },
  { name: "February", uv: 1234, pv: 4300, amt: 2100, year: "2024" },
];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");

  // Filter data based on selected month
  const filteredData = rechartsData.filter((data) => data.name === selectedMonth)[0];

  // Filter data based on selected year
  const filteredChartData = rechartsData.filter((data) => data.year === selectedYear);

  return (
    <div className="container py-5">
      {/* Overview Section */}
      <div className="row mb-4">
        <div className="col-md-8 border shadow-sm p-5">
          {/* Filter Dropdown for Month */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="card ">
                <div className="card-body">
                  <h6 className="card-title"> View Monthly Data</h6>
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select a month</option>
                    {rechartsData.map((data) => (
                      <option key={data.name} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* First Box - Total Orders */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1"><AssignmentTurnedInIcon className="fs-1 "/> Total Orders</p>
                  <h3 className="mb-1">{filteredData ? filteredData.uv : "0"}</h3>
                  <small className="text-success">+12% vs previous 28 days</small>
                </div>
              </div>
            </div>
            {/* Second Box - Cancelled Orders */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1"><EventBusyIcon className="fs-1 "/> Cancelled Orders</p>
                  <h3 className="mb-1">{filteredData ? filteredData.pv : "0"}</h3>
                  <small className="text-success">+4% vs previous 28 days</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            {/* Third Box - Seller Requests */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1"> <FaCodePullRequest className="fs-1 " />  Seller Requests</p>
                  <h3 className="mb-1">{filteredData ? filteredData.amt : "0"}</h3>
                  <small className="text-danger">-0.89% vs previous 28 days</small>
                </div>
              </div>
            </div>
            {/* Fourth Box - Product Requests */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1"><MdProductionQuantityLimits className="fs-1 "/> Product Requests</p>
                  <h3 className="mb-1">{filteredData ? filteredData.amt : "0"}</h3>
                  <small className="text-success">+2% vs previous 28 days</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Products Section */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Popular Products</h5>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col" className="text-end">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Product A */}
                  <tr>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://m.media-amazon.com/images/I/61t+UHcrOrL._SX522_.jpg`}
                        alt="Product A"
                        className="rounded me-3"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h6 className="mb-0">CHANELL GABRIELLE SPRAY </h6>
                      </div>
                    </td>
                    <td className="text-end fw-bold">$5461</td>
                  </tr>

                  {/* Product B */}
                  <tr>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://m.media-amazon.com/images/I/81LskAU5h1L._AC_UL480_FMwebp_QL65_.jpg`}
                        alt="Product B"
                        className="rounded me-3"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h6 className="mb-0">Canon EOS R50 </h6>
                      </div>
                    </td>
                    <td className="text-end fw-bold">$5461</td>
                  </tr>

                  {/* Product C */}
                  <tr>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://m.media-amazon.com/images/I/71qlYpwQTxL._SX679_.jpg`}
                        alt="Product C"
                        className="rounded me-3"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h6 className="mb-0">Apple iPad Air 11</h6>
                      </div>
                    </td>
                    <td className="text-end fw-bold">$5461</td>
                  </tr>

                  {/* Product D */}
                  <tr>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://m.media-amazon.com/images/I/41Fz1tPJkHL._SX300_SY300_QL70_FMwebp_.jpg`}
                        alt="Product D"
                        className="rounded me-3"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h6 className="mb-0">Blaupunkt Atomik PS30</h6>
                      </div>
                    </td>
                    <td className="text-end fw-bold">$5461</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Filter Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div>
              <label className="mr-2">Year</label>
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div>
              <button className="btn btn-dark" onClick={() => console.log("Generate report clicked")}>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Section */}
      <div className="row">
        
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Yearly Data Overview</h5>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="uv" fill="#8884d8" />
                  <Bar dataKey="pv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
