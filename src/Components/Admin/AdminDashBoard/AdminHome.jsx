import React from "react";
import AdminDashboard from "./AdminDashboard";
import AdminNavBar from "../AdminNavbar/AdminNavbar";

const AdminHome = () => {
  return (
    <>
      <AdminNavBar />
      <div className="container-fluid" style={{ marginTop: "83px" }}>
        <AdminDashboard />
      </div>
    </>
  );
};

export default AdminHome;
