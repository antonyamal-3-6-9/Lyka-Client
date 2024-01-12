import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const EditProductNav = (props) => {
  const BASE_URL = "http://127.0.0.1:8000/product/";

  Modal.setAppElement('#root');
  
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/seller/products")
  };

  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <button
            to="/seller-home"
            className="btn btn-danger me-2"
            onClick={handleCancel}
          >
            Go Back
          </button>
        </li>
      </ul>
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <h5 className="nav-link">View and Edit Product</h5>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-brand">LYKA</li>
      </ul>
    </div>
  </div>
</nav>

      </div>
    </>
  );
};

export default EditProductNav;
