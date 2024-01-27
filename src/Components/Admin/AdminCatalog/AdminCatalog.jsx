import React, { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminCategory from "./AdminCategoryList";
import AdminNavBar from "../AdminNavbar/AdminNavbar";
import { Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));

const AdminCatalog = () => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <>
      <AdminNavBar />
      <div className="container-fluid" style={{ marginTop: "83px" }}>
        <Item><div className="d-flex justify-content-center">
          <span className={`${!showProducts ? "h5 m-1 text-dark" : "h6 m-2"}`}><a onClick={() => {setShowProducts(false)}}>Products</a></span>
          <span className={`${showProducts ? "h5 m-1 text-dark" : "h6 m-2"}`}><a onClick={() => {setShowProducts(true)}}>Categories</a></span>
          </div>
          {showProducts ? <AdminCategory /> : <AdminProductList />}
        </Item>
      </div>
    </>
  );
};

export default AdminCatalog;
