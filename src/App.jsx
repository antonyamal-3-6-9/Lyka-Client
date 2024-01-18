import { React, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import AddProduct from "./Components/Seller/Seller Dashboard/Products/AddProducts/AddProduct.jsx";
import Registration from "./Components/Seller/Seller Registration/Registration.jsx";
import SellerLogin from "./Components/Seller/Seller Login/SellerLogin.jsx";
import EditProduct from "./Components/Seller/Seller Dashboard/Products/Edit Products/EditProduct.jsx";
import AddPickupStore from "./Components/Seller/Seller Dashboard/PickupStore/AddPickupStore.jsx";
import SellerHomeNavbar from "./Components/Seller/Seller Dashboard/Home/SellerNavbar.jsx";
import SellerProducts from "./Components/Seller/Seller Dashboard/Products/SellerProducts.jsx";
import PickupStore from "./Components/Seller/Seller Dashboard/PickupStore/PickupStore.jsx";
import SellerOrder from "./Components/Seller/Seller Dashboard/Orders/SellerOrder.jsx";
import EditStore from "./Components/Seller/Seller Dashboard/PickupStore/EditStore.jsx";
import Verification from "./Components/Seller/Seller Dashboard/Verification/Verification.jsx";
import SellerProfile from "./Components/Seller/Seller Dashboard/Profile/SellerProfile.jsx";
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
import OrderDetails from "./Components/Order/OrderDetails.jsx";
import CustomerProfile from "./Components/Customer/Profile/CustomerProfile.jsx";
import ResponsiveAppBar from "./Components/Navbar/MuiNavBar.jsx";
import ProductByCategory from "./Components/Product/ProductByCategory.jsx";
import Category from "./Components/Home/categories/Category.jsx";
import CustomerVerify from "./Components/Customer/Login and Register/CustomerVerify.jsx";
import { useSelector, useDispatch } from "react-redux";
import { initialAction, logOutAction } from "./redux/actions/authUserActions.jsx";
import Notification from "./Components/Notification/Notification.jsx";

function App() {

  const signal = useSelector((state) => state.userAuth.notificationSignal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialAction());
    return () => {
      dispatch(logOutAction())
    }
  }, [])

  return (
    <>
      {signal && <Notification />}

      <Router>
        <Routes>
          //Customer User Interface Routes
          <Route
            exact
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/product/:type/:name"
            element={
              <>
                <ResponsiveAppBar />
                <Category />
                <ProductByCategory />
              </>
            }
          />
          <Route
            path="/product/:product_id"
            element={
              <>
                <ResponsiveAppBar />
                <ProductDetail />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <ResponsiveAppBar />
                <ShoppingCart />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <ResponsiveAppBar />
                <Checkout />
              </>
            }
          />
          <Route path="customer-login" element={<LoginForm />} />
          <Route path="customer-register" element={<RegisterForm />} />
          <Route
            path="customer/auth/verify/:email/:token/"
            element={<CustomerVerify />}
          />
          <Route
            path="order-placed"
            element={
              <>
                <ResponsiveAppBar />
                <OrderPlaced />
              </>
            }
          />
          <Route
            path="account"
            element={
              <>
                <ResponsiveAppBar />
                <CustomerProfile />
              </>
            }
          />
          <Route
            path="order/:orderId"
            element={
              <>
                <ResponsiveAppBar />
                <OrderDetails />
              </>
            }
          />
          //Seller Interface routes
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
              <SellerHomeNavbar/>
                <SellerHome/>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
