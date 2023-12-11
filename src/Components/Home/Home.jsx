import React from "react";
import Category from "./categories/Category.jsx";
import Header from "./Header.jsx";
import Contents from "./Contents/Contents.jsx";
import ProductCard from "../Product/ProductCard.jsx"
import ProductItem from "../Product/ProductItem.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import ProductByCategory from "../Product/ProductByCategory.jsx";
import Cart from "../Cart/Cart.jsx";
import ProductDetail from "../Product/ProductDetail.jsx";
import Checkout from "../Checkout/Checkout.jsx";
import SellerOrderDetails from "../Seller/Seller Dashboard/Orders/SellerOrderDetails.jsx";
import AddBasicDetails from "../Seller/Seller Dashboard/Products/AddProducts/AddBasicDetails.jsx";
import AddPickupStore from "../Seller/Seller Dashboard/PickupStore/AddPickupStore.jsx";
import PickupStore from "../Seller/Seller Dashboard/PickupStore/PickupStore.jsx";




function Home() {
  return (
    <>
    <Category/>
      <Header/>
      <Contents />
      <ProductByCategory/>
    </>
  );
}

export default Home;
