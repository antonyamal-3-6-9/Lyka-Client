import React from "react";

const ProfileNav = (props) => {
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
                    onClick={() => props.setIsUpdatePassword(true)}
                  >
                    Update Password
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2">
                    Delete Account
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`btn me-2 ${
                      props.isVerified
                        ? "btn-outline-success"
                        : "btn-outline-danger"
                    }`}
                    disabled
                  >
                    {props.isVerified ? "Verified" : "Not Verified"}
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

export default ProfileNav;
