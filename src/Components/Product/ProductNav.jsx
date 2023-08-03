import React from "react";
import { Link } from "react-router-dom";

const ProductNav = () => {
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
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      id="sortDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="sortDropdown"
                    >
                      <li>
                        <button className="dropdown-item" type="button">
                          Price low-to-high
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Price high-to-low
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Rating low-to-high
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" type="button">
                          Rating high-to-low
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default ProductNav;
