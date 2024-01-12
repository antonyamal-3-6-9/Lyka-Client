// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "..//Customer/Home/Home";
// import LoginForm from "../Customer/Login and Register/CustomerLogin";
// import RegisterForm from "../Customer/Login and Register/CustomerRegister";
// import ResponsiveAppBar from "../Customer/Home/Navbar/MuiNavBar";
// import Category from "../Customer/Home/categories/Category";
// import ProductByCategory from "../Customer/Product/ProductByCategory";
// import ProductDetail from "../Customer/Product/ProductDetail"
// import ShoppingCart from "../Customer/Cart/Cart"
// import Checkout from "../Customer/Checkout/Checkout"
// import LoginForm from "../Customer/Login and Register/CustomerLogin"
// import CustomerVerify from "../Customer/Login and Register/CustomerVerify";
// import RegisterForm from "../Customer/Login and Register/CustomerRegister"
// import OrderPlaced from "../Customer/Order/OrderPlaced"
// import OrderDetails from "../Customer/Order/OrderDetails"
// import CustomerProfile from "../Customer/Profile/CustomerProfile";

// export default CustomerBase = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/c/" element=<Home /> />
//         <Route path="/c/customer-login" element={<LoginForm />} />
//         <Route path="/c/customer-register" element={<RegisterForm />} />
//         <Route
//           path="/product/:type/:name"
//           element={
//             <>
//               <ResponsiveAppBar />
//               <Category />
//               <ProductByCategory />
//             </>
//           }
//         />
//         <Route
//           path="/product/:product_id"
//           element={
//             <>
//               <ResponsiveAppBar />
//               <ProductDetail />
//             </>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <>
//               <ResponsiveAppBar />
//               <ShoppingCart />
//             </>
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             <>
//               <ResponsiveAppBar />
//               <Checkout />
//             </>
//           }
//         />
//                   <Route
//             path="/checkout"
//             element={
//               <>
//                 <ResponsiveAppBar />
//                 <Checkout />
//               </>
//             }
//           />
//           <Route path="customer-login" element={<LoginForm />} />
//           <Route path="customer-register" element={<RegisterForm />} />
//           <Route
//             path="customer/auth/verify/:email/:token/"
//             element={<CustomerVerify />}
//           />
//           <Route
//             path="order-placed"
//             element={
//               <>
//                 <ResponsiveAppBar />
//                 <OrderPlaced />
//               </>
//             }
//           />
//           <Route
//             path="account"
//             element={
//               <>
//                 <ResponsiveAppBar />
//                 <CustomerProfile />
//               </>
//             }
//           />
//           <Route
//             path="order/:orderId"
//             element={
//               <>
//                 <ResponsiveAppBar />
//                 <OrderDetails />
//               </>
//             }
//           />
//       </Routes>
//     </Router>
//   );
// };
