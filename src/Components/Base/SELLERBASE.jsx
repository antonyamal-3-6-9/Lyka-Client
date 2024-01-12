// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SellerHomeNavbar from "../Seller/Home/SellerNavbar"
// import SellerProducts from "../Seller/Products/SellerProducts"
// import PickupStore from "../Seller/PickupStore/PickupStore"
// import SellerOrder from "../Seller/Orders/SellerOrder"
// import SellerOrderDetails from "../Seller/Orders/SellerOrderDetails"
// import SellerHome from "../Seller/Home/Home"
// import Verification from "../Seller/Verification/Verification"
// import SellerProfile from "../Seller/Profile/SellerProfile"
// import EditProduct from "../Seller/"


// export default SellerBase = () => {
//     return (
//         <Router>
//             <Routes>
//             <Route
//             path="seller/products"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <SellerProducts />
//               </>
//             }
//           />
//           <Route
//             path="seller/store"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <PickupStore />
//               </>
//             }
//           />
//           <Route
//             path="seller/orders"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <SellerOrder />
//               </>
//             }
//           />
//           <Route
//             path="seller/order/:orderId"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <SellerOrderDetails />
//               </>
//             }
//           />
//           <Route
//             path="seller/home"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <SellerHome />
//               </>
//             }
//           />
//           <Route
//             path="seller/verify"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <Verification />
//               </>
//             }
//           />
//           <Route
//             path="seller/profile"
//             element={
//               <>
//                 <SellerHomeNavbar />
//                 <SellerProfile />
//               </>
//             }
//           />
//           <Route
//             path="seller/edit-product/:product_id"
//             element={<EditProduct />}
//           />
//           <Route
//             path="seller/edit-address/:address_id"
//             element={<EditStore />}
//           />
//           <Route path="seller-login" element={<SellerLogin />} />
//           <Route path="seller-register" element={<Registration />} />
//           <Route path="seller/add-product" element={<AddProduct />} />
//           <Route path="seller/check-product" element={<CheckProduct />} />
//           <Route path="seller/add-item" element={<AddItem />} />
//           <Route path="seller/add-store" element={<AddPickupStore />} />
//             </Routes>
//         </Router>
//     )
// }