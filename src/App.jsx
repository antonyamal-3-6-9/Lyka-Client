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
import Profile from "./Components/Seller/Seller Dashboard/Profile/Profile.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import ProductDetail from "./Components/Product/ProductDetail.jsx";
import ShoppingCart from "./Components/Cart/Cart.jsx";
import LoginForm from "./Components/Customer/Login and Register/CustomerLogin.jsx";
import RegisterForm from "./Components/Customer/Login and Register/CustomerRegister.jsx";
import AddItem from "./Components/Seller/Seller Dashboard/Products/AddProducts/AddItem.jsx";
import CheckProduct from "./Components/Seller/Seller Dashboard/Products/AddProducts/CheckProduct.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import OrderPlaced from "./Components/Order/OrderPlaced.jsx";

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
                <Profile />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
