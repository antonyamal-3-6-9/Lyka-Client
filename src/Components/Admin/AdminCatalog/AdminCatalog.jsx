import React from "react";
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
  return (
    <>
      <AdminNavBar />
      <div className="container-fluid" style={{ marginTop: "83px" }}>
        <Item>
          <AdminCategory/>
          <hr></hr>
          <AdminProductList />
        </Item>
      </div>
    </>
  );
};

export default AdminCatalog
