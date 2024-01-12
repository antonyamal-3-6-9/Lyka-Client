import React from "react";
import { Link } from "react-router-dom";

const VerifyNav = (props) => {
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
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => props.verify("Address")}
                  >
                    Address
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary me-2 mx-2"
                    onClick={() => props.verify("Bank")}
                  >
                    Bank
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => props.verify("Pan")}
                  >
                    Pan
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => props.verify("GST")}
                  >
                    GST
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default VerifyNav;
