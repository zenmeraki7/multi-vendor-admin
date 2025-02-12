import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import AddVariant from "./components/AddVariant";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerPro from "./pages/SellerPro";
import ProductList from "./pages/ProductList";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import VendorDetails from "./pages/VendorDetails";
import OrderDetails from "./pages/OrderDetails";
import UserManagement from "./pages/UserManagement";
import Review from "./pages/Review";
import VendorApprove from "./pages/VendorApprove";
import VendorView from "./pages/VendorView";
import ViewProduct from "./pages/ViewProduct/ViewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryType from "./pages/Categories/CategoryType/CategoryType";
import ViewCategories from "./pages/Categories/category/ViewCategories";
import AddCategoryType from "./pages/Categories/CategoryType/AddCategoryType";
import ViewCategoryType from "./pages/Categories/CategoryType/ViewCategoryType";
import SubCategories from "./pages/Categories/SubCategories/SubCategories";
import AddCategory from "./pages/Categories/category/AddCategory";
import Category from "./pages/Categories/category/Category";
import AddSubCategories from "./pages/Categories/SubCategories/AddSubCategories";
import ViewSubCategories from "./pages/Categories/SubCategories/ViewSubcategories";
import BankManagement from "./pages/Others/Bank/BankManagement";
import CountryManagement from "./pages/Others/Country/CountryManagement";
import StateManagement from "./pages/Others/State/StateManagement";
import ViewBank from "./pages/Others/Bank/ViewBank";
import AddBank from "./pages/Others/Bank/AddBank";
import ViewCountry from "./pages/Others/Country/ViewCountry";
import AddCountry from "./pages/Others/Country/AddCountry";
import ViewState from "./pages/Others/State/ViewState";
import AddState from "./pages/Others/State/AddState";
import Commision from "./pages/Commision/Commision";
import AdminLogin from "./pages/Auth/AdminLogin";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AddSeller from "./pages/AddSeller/AddSeller";
import TransactionPage from "./pages/Transaction/Transaction";

function App() {
  const dummyProduct = {
    title: "Smartphone XYZ 128GB",
    description: "A high-performance smartphone with amazing features.",
    brand: "XYZ Electronics",
    price: 699.99,
    discountedPrice: 599.99,
    thumbnail: {
      url: "https://via.placeholder.com/600x400",
      altText: "Smartphone XYZ",
    },
    images: [
      { url: "https://via.placeholder.com/200x200", altText: "Image 1" },
      { url: "https://via.placeholder.com/200x200", altText: "Image 2" },
      { url: "https://via.placeholder.com/200x200", altText: "Image 3" },
    ],
    specifications: [
      { key: "RAM", value: "8GB" },
      { key: "Storage", value: "128GB" },
      { key: "Camera", value: "48MP" },
    ],
    offers: [
      {
        title: "10% off on XYZ Bank Cards",
        description: "Get an additional 10% off using XYZ Bank credit cards.",
        discountPercentage: 10,
        validUntil: new Date("2025-12-31"),
      },
      {
        title: "Free Accessories Pack",
        description:
          "Get a free accessories pack with the purchase of this phone.",
        discountPercentage: 0,
        validUntil: new Date("2025-06-30"),
      },
    ],
    variants: [
      {
        attribute: "Color",
        value: "Black",
        additionalPrice: 0,
        stock: 50,
        image: {
          url: "https://via.placeholder.com/100x100",
          altText: "Black variant",
        },
      },
      {
        attribute: "Color",
        value: "Blue",
        additionalPrice: 10,
        stock: 30,
        image: {
          url: "https://via.placeholder.com/100x100",
          altText: "Blue variant",
        },
      },
      {
        attribute: "Storage",
        value: "256GB",
        additionalPrice: 50,
        stock: 20,
        image: {
          url: "https://via.placeholder.com/100x100",
          altText: "256GB variant",
        },
      },
    ],
    rating: {
      average: 4.5,
      count: 200,
    },
    shippingDetails: {
      weight: "0.5",
      freeShipping: true,
      shippingCharge: 0,
    },
    returnPolicy: {
      isReturnable: true,
      returnWindow: 30,
    },
    seller: {
      name: "XYZ Electronics Store",
      contactInfo: {
        email: "support@xyzstore.com",
        phone: "+1 (555) 123-4567",
      },
      location: "123 Electronics Ave, Silicon Valley, CA",
    },
  };
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        {/* Wrap all pages inside Layout to ensure header/footer are present */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sellers" element={<VendorDetails />} />
          <Route path="/orders" element={<OrderDetails />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/vendor-approve/:vendorId" element={<VendorApprove />} />
          <Route path="/vendor-view/:vendorId" element={<VendorView />} />
          <Route path="/category-Type" element={<CategoryType />} />
          <Route path="/category" element={<Category />} />
          <Route path="/view-category/:id" element={<ViewCategories />} />
          <Route path="/viewcategorytype/:id" element={<ViewCategoryType />} />
          <Route path="/add-Categorytype" element={<AddCategoryType />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/sub-category" element={<SubCategories />} />
          <Route path="/add-subcategory" element={<AddSubCategories />} />
          <Route path="view-subcategory/:id" element={<ViewSubCategories />} />
          <Route path="/bank-management" element={<BankManagement />} />
          <Route path="/country-management" element={<CountryManagement />} />
          <Route path="/state-management" element={<StateManagement />} />
          <Route path="/view-bank/:id" element={<ViewBank />} />
          <Route path="/add-bank" element={<AddBank />} />
          <Route path="/view-country/:id" element={<ViewCountry />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/view-state/:id" element={<ViewState />} />
          <Route path="/add-state" element={<AddState />} />
          <Route
            path="view-product/:id"
            element={<PrivateRoute component={<ViewProduct />} />}
          />
          <Route path="/product-list" element={<ProductList />} />
          <Route
            path="/seller-profile"
            element={<PrivateRoute component={<SellerPro />} />}
          />
          <Route path="/Commision" element={< PrivateRoute component={<Commision/>} /> } />
          <Route
            path="/transaction"
            element={<PrivateRoute component={<TransactionPage />} />}
          />
        </Route>

        <Route path="add-variant" element={<AddVariant />} />
        
        <Route path="/add-seller" element={<AddSeller />} />
        
      </Routes>
    </>
  );
}

export default App;
