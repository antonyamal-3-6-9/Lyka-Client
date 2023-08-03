import React from "react";
import { Link } from "react-router-dom";

const SellerProductNav = () => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                    to="/seller/check-product"
                    className="btn btn-outline-primary me-2"
                  >
                    Add New Product
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="sortDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                    <li>
                      <button className="dropdown-item" type="button">
                        Live
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Dead
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Top Rated
                      </button>
                    </li>
                    {/* Add more options as needed */}
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SellerProductNav;
