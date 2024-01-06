import React from "react";
import { Button } from "@mui/material";

const ProductNav = ({name}) => {
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
                    <Button
                      className="dropdown-toggle"
                      type="button"
                      id="sortDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      variant="contained"
                      style={{backgroundColor: "#16213E" }}
                    >
                      Sort
                    </Button>
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
                <li className="nav-item" style={{marginLeft: "50px"}}>
                  <div className="navbar-brand">
                    <h3 className="text-dark h3"></h3>
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
