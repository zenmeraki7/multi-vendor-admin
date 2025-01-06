import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BarChart,
  Bar as RechartsBar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Data for Recharts chart
const rechartsData = [
  { name: "January", uv: 4000, pv: 2400, amt: 2400 },
  { name: "February", uv: 3000, pv: 1398, amt: 2210 },
  { name: "March", uv: 2000, pv: 9800, amt: 2290 },
  { name: "April", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "June", uv: 2390, pv: 3800, amt: 2500 },
  { name: "July", uv: 3490, pv: 4300, amt: 2100 },
  { name: "August", uv: 3490, pv: 4300, amt: 2100 },
  { name: "September", uv: 3490, pv: 4300, amt: 2100 },
  { name: "October", uv: 3490, pv: 4300, amt: 2100 },
  { name: "November", uv: 3490, pv: 4300, amt: 2100 },
  { name: "December", uv: 3490, pv: 4300, amt: 2100 },

];
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Data for Chart.js
const chartJsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Income",
      data: [200, 250, 300, 350, 280, 400, 320, 390, 330, 370, 400, 420],
      backgroundColor: "#007bff",
    },
  ],
};

const Dashboard = () => {
  // Bar chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [200, 250, 300, 350, 280, 400, 320, 390, 330, 370, 400, 420],
        backgroundColor: "#007bff", // Bootstrap primary color
      },
    ],
  };

  return (
    <div className="container py-5">
    {/* Overview Section */}
<div className="row mb-4">
  <div className="col-md-8">
    <div className="row">
      {/* First Box */}
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="text-muted mb-1">Total Revenue</p>
            <h3 className="mb-1">$4,562</h3>
            <small className="text-success">+12% vs preview . 28 days</small>
          </div>
        </div>
      </div>
      {/* Second Box */}
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="text-muted mb-1">Total Visitors</p>
            <h3 className="mb-1">$2,562</h3>
            <small className="text-success">+4% vs preview . 28 days</small>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      {/* Third Box */}
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="text-muted mb-1">Total Transactions</p>
            <h3 className="mb-1">$2,262</h3>
            <small className="text-danger">-0.89% vs preview . 28 days</small>
          </div>
        </div>
      </div>
      {/* Fourth Box */}
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="text-muted mb-1">Total Products</p>
            <h3 className="mb-1">$2,100</h3>
            <small className="text-success">+2% vs preview . 28 days</small>
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
                <h6 className="mb-0">Product A</h6>
                <small className="text-muted">UI Kit</small>
              </div>
            </td>
            <td className="text-end fw-bold">$5461</td>
          </tr>

          {/* Product B */}
          <tr>
            <td className="d-flex align-items-center">
              <img
                src={`https://m.media-amazon.com/images/I/81p0tJzUIpL._AC_SL1500_.jpg`}
                alt="Product B"
                className="rounded me-3"
                width="40px"
                height="40px"
              />
              <div>
                <h6 className="mb-0">Product B</h6>
                <small className="text-muted">UI Kit</small>
              </div>
            </td>
            <td className="text-end fw-bold">$5461</td>
          </tr>

          {/* Product C */}
          <tr>
            <td className="d-flex align-items-center">
              <img
                src={`https://m.media-amazon.com/images/I/91Znb67w+oL._AC_SL1500_.jpg`}
                alt="Product C"
                className="rounded me-3"
                width="40px"
                height="40px"
              />
              <div>
                <h6 className="mb-0">Product C</h6>
                <small className="text-muted">UI Kit</small>
              </div>
            </td>
            <td className="text-end fw-bold">$5461</td>
          </tr>

          {/* Product D */}
          <tr>
            <td className="d-flex align-items-center">
              <img
                src={`https://m.media-amazon.com/images/I/71pWZf0POdL._AC_SL1500_.jpg`}
                alt="Product D"
                className="rounded me-3"
                width="40px"
                height="40px"
              />
              <div>
                <h6 className="mb-0">Product D</h6>
                <small className="text-muted">UI Kit</small>
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


      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Welcome to our new <span className="text-primary">online experience</span>
              </h5>
              <div className="d-flex mt-3">
                {["Johnson D.", "Didinya J.", "Penny L.", "Elon M."].map((name, index) => (
                  <div key={index} className="text-center me-3">
                    <img
                      src={`https://via.placeholder.com/40`}
                      alt={name}
                      className="rounded-circle"
                    />
                    <p className="small mt-2">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Income Chart Section */}
      <div className="mb-4">
       

        {/* Recharts Section */}
<div className="card shadow-sm">
  <div className="card-body">
    <h5 className="card-title">Custom Recharts Chart</h5>
    <BarChart
      width={900} 
      height={300}
      data={rechartsData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <RechartsBar
        dataKey="uv"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {rechartsData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </RechartsBar>
    </BarChart>
  </div>
</div>

        </div>
      </div>
   
  );
};

export default Dashboard;