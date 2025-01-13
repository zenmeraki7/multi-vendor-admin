import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import './Dashboard.css'
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventBusyIcon from "@mui/icons-material/EventBusy";
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

];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");

  // Filter data based on selected month
  const filteredData = rechartsData.filter(
    (data) => data.name === selectedMonth
  )[0];

  // Filter data based on selected year
  const filteredChartData = rechartsData.filter(
    (data) => data.year === selectedYear
  );

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
                    <option value="hidden">Select a month</option>
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
                  <p className="text-muted mb-1">
                    <AssignmentTurnedInIcon className="fs-1 " /> Total Orders
                  </p>
                  <h3 className="mb-1">
                    {filteredData ? filteredData.uv : "0"}
                  </h3>
                  <small className="text-success">
                    +12% vs previous 28 days
                  </small>
                </div>
              </div>
            </div>
            {/* Second Box - Cancelled Orders */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1">
                    <EventBusyIcon className="fs-1 " /> Cancelled Orders
                  </p>
                  <h3 className="mb-1">
                    {filteredData ? filteredData.pv : "0"}
                  </h3>
                  <small className="text-success">
                    +4% vs previous 28 days
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            {/* Third Box - Seller Requests */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1">
                    {" "}
                    <FaCodePullRequest className="fs-1 " /> Seller Requests
                  </p>
                  <h3 className="mb-1">
                    {filteredData ? filteredData.amt : "0"}
                  </h3>
                  <small className="text-danger">
                    -0.89% vs previous 28 days
                  </small>
                </div>
              </div>
            </div>
            {/* Fourth Box - Product Requests */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted mb-1">
                    <MdProductionQuantityLimits className="fs-1 " /> Product
                    Requests
                  </p>
                  <h3 className="mb-1">
                    {filteredData ? filteredData.amt : "0"}
                  </h3>
                  <small className="text-success">
                    +2% vs previous 28 days
                  </small>
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
                    <th scope="col" className="text-end">
                      Earnings
                    </th>
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
      {/* Top Sellers Section */}
      <div className="row mb-4">
      <div className="col-md-12">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Top Sellers</h5>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={2}
              slidesPerView={5}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ padding: "10px 0" ,color:'black' }}
            >
              {/* Seller 1 */}
              <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Seller 1"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">John Doe</h6>
                    <small className="text-muted">Sales: $12,345</small>
                  </div>
                </div>
              </SwiperSlide>

              {/* Seller 2 */}
              <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Seller 2"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">Jane Smith</h6>
                    <small className="text-muted">Sales: $10,890</small>
                  </div>
                </div>
              </SwiperSlide>

              {/* Seller 3 */}
              <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Seller 3"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">Mike Ross</h6>
                    <small className="text-muted">Sales: $9,765</small>
                  </div>
                </div>
              </SwiperSlide>

              {/* Seller 4 */}
              <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/women/50.jpg"
                    alt="Seller 4"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">Emma Brown</h6>
                    <small className="text-muted">Sales: $8,654</small>
                  </div>
                </div>
              </SwiperSlide>
                   {/* Seller 1 */}
                   <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Seller 1"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">John Doe</h6>
                    <small className="text-muted">Sales: $12,345</small>
                  </div>
                </div>
              </SwiperSlide>
                   {/* Seller 1 */}
                   <SwiperSlide>
                <div
                  className="card shadow-sm"
                  style={{
                    width: "160px",
                    borderRadius: "12px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Seller 1"
                    className="card-img-top rounded-circle p-3"
                    style={{ width: "90px", margin: "auto" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title mb-1">John Doe</h6>
                    <small className="text-muted">Sales: $12,345</small>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
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
              <button
                className="btn btn-dark"
                onClick={() => console.log("Generate report clicked")}
              >
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
