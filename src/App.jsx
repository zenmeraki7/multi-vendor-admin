import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import AddVariant from "./components/AddVariant";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerPro from "./pages/SellerPro";
import ProductList from "./pages/ProductList";
import { Toaster } from "react-hot-toast";
  import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import VendorDetails from "./pages/VendorDetails";
import OrderDetails from "./pages/OrderDetails";
import UserManagement from "./pages/UserManagement";
import Review from "./pages/Review";
import VendorApprove from "./pages/VendorApprove";
import VendorView from "./pages/VendorView";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="admin-login" element={<AdminLogin/>}/>
        {/* Wrap all pages inside Layout to ensure header/footer are present */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/sellers" element={<VendorDetails/>} />
          <Route path="/orders" element={<OrderDetails/>}/>
          <Route path="/user" element={<UserManagement/>} />
          <Route path="/reviews" element={<Review/>} />
          <Route path="/vendor-approve" element={<VendorApprove/>} />
          <Route path="/vendor-view" element={<VendorView/>}/>
          <Route
            path="add-product"
            element={<PrivateRoute component={<AddProduct />} />}
          />
          <Route path="/product-list" element={<ProductList />} />
          <Route
            path="/seller-profile"
            element={<PrivateRoute component={<SellerPro />} />}
          />
        </Route>

        <Route path="add-variant" element={<AddVariant />} />
      </Routes>
    </>
  );
}

export default App;
