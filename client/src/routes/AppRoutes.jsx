import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Landing from "../pages/Landingpage/Landingpage";
import Profile from "../pages/User/Profile/Profile";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import WishList from "../pages/User/WishList/WishList";
import Cart from "../pages/User/Cart/Cart";
import Checkout from "../pages/User/CheckOut/CheckOut";
import Orders from "../pages/User/Orders/Orders";
import ProductGrid from "../pages/Admin/AdminProduct/ProductGrid/ProductGrid";
import AddProductPage from "../pages/Admin/AdminProduct/AddEditViewProduct/AddEditViewProduct";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                
                <Route path="/landingpage" element={<Landing />} >
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="products" element={<ProductGrid />} />
                    <Route path="addproducts" element={<AddProductPage />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;