import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import AddProduct from "./Components/Seller/Seller Dashboard/Products/AddProducts/AddProduct.jsx";
import Registration from "./Components/Seller/Seller Registration/Registration.jsx";
import SellerLogin from "./Components/Seller/SellerLogin.jsx";
import EditProduct from "./Components/Seller/Seller Dashboard/Products/Edit Products/EditProduct.jsx";
import AddPickupStore from "./Components/Seller/Seller Dashboard/PickupStore/AddPickupStore.jsx";
import SellerHomeNavbar from "./Components/Seller/SellerNavbar.jsx";
import SellerProducts from "./Components/Seller/Seller Dashboard/Products/SellerProducts.jsx";
import PickupStore from "./Components/Seller/Seller Dashboard/PickupStore/PickupStore.jsx";
import SellerOrder from "./Components/Seller/Seller Dashboard/Orders/SellerOrder.jsx";
import EditStore from "./Components/Seller/Seller Dashboard/PickupStore/EditStore.jsx";
import Verification from "./Components/Seller/Seller Dashboard/Verification/Verification.jsx";
import SellerProfile from "./Components/Seller/Seller Dashboard/Profile/SellerProfile.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import ProductDetail from "./Components/Product/ProductDetail.jsx";
import ShoppingCart from "./Components/Cart/Cart.jsx";
import LoginForm from "./Components/Customer/Login and Register/CustomerLogin.jsx";
import RegisterForm from "./Components/Customer/Login and Register/CustomerRegister.jsx";
import AddItem from "./Components/Seller/Seller Dashboard/Products/AddProducts/AddItem.jsx";
import CheckProduct from "./Components/Seller/Seller Dashboard/Products/AddProducts/CheckProduct.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import OrderPlaced from "./Components/Order/OrderPlaced.jsx";
import SellerOrderDetails from "./Components/Seller/Seller Dashboard/Orders/SellerOrderDetails.jsx";
import SellerHome from "./Components/Seller/Seller Dashboard/Home/Home.jsx";
import Orderlist from "./Components/Order/Orderlist.jsx";
import OrderDetails from "./Components/Order/OrderDetails.jsx";
import CustomerProfile from "./Components/Customer/Profile/CustomerProfile.jsx";
import OrderListings from "./Components/Order/OrderListings.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="seller/products"
            element={
              <>
                <SellerHomeNavbar />
                <SellerProducts />
              </>
            }
          />
          <Route
            path="seller/store"
            element={
              <>
                <SellerHomeNavbar />
                <PickupStore />
              </>
            }
          />
          <Route
            path="seller/orders"
            element={
              <>
                <SellerHomeNavbar />
                <SellerOrder />
              </>
            }
          />
          <Route
            path="seller/order/:orderId"
            element={
              <>
                <SellerHomeNavbar />
                <SellerOrderDetails />
              </>
            }
          />
          <Route
            path="seller/home"
            element={
              <>
                <SellerHomeNavbar />
                <SellerHome />
              </>
            }
          />
          <Route
            path="seller/verify"
            element={
              <>
                <SellerHomeNavbar />
                <Verification />
              </>
            }
          />
          <Route
            path="seller/profile"
            element={
              <>
                <SellerHomeNavbar />
                <SellerProfile />
              </>
            }
          />
          <Route
            path="seller/edit-product/:product_id"
            element={<EditProduct />}
          />
          <Route
            path="seller/edit-address/:address_id" 
            element={<EditStore />}
          />
          <Route path="seller-login" element={<SellerLogin />} />
          <Route path="seller-register" element={<Registration />} />
          <Route path="seller/add-product" element={<AddProduct />} />
          <Route path="seller/check-product" element={<CheckProduct />} />
          <Route path="seller/add-item" element={<AddItem />} />
          <Route path="seller/add-store" element={<AddPickupStore />} />
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/product/:product_id"
            element={
              <>
                <Navbar />
                <ProductDetail />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <ShoppingCart />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <Checkout />
              </>
            }
          />
          <Route path="customer-login" element={<LoginForm />} />
          <Route path="customer-register" element={<RegisterForm />} />
          <Route
            path="order-placed"
            element={
              <>
                <Navbar />
                <OrderPlaced />
              </>
            }
          />
          <Route
            path="account/:option"
            element={
              <>
                <Navbar />
                <CustomerProfile />
              </>
            }
          />
          <Route
            path="order/:orderId"
            element={
              <>
                <Navbar />
                <OrderDetails />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
