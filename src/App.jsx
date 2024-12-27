import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import AddVariant from "./components/AddVariant";
import 'bootstrap/dist/css/bootstrap.min.css';
import SellerPro from "./pages/SellerPro";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="add-product"
            element={<PrivateRoute component={<AddProduct />} />}
          />
        </Route>
        <Route path="add-variant" element={<AddVariant/>}   />
        <Route path = '/seller-profile' element = {<SellerPro/>}/>
      </Routes>
    </>
  );
}

export default App;
