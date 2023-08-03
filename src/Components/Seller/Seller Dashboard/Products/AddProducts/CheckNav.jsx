import React from "react";
import { Link } from "react-router-dom";

const CheckNav = () => {
  return (
    <>
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
                <Link
                  to="/seller/products"
                  className="btn btn-danger me-2"
                  onClick
                >
                  Cancel
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <h5 className="nav-link">Select a product</h5>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="navbar-brand">LYKA</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CheckNav