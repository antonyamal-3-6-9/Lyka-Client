import React from "react";

const CheckOutNav = (props) => {
  return (
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
                className="btn btn-danger me-2"
                onClick={props.handleCancel}
              >
                Cancel
              </button>
            </li>
            {props.isPayment && <li className="nav-item">
              <button
                className="btn btn-danger me-2"
                onClick={() => {props.setAddressAdded(true);props.setIsPayment(false)}}
              >
                GoBack
              </button>
            </li>}
          </ul>
          <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <h4 className="navbar-brand">{props.itemVerified ? "Confirm Items" : props.addressAdded ? "Add Address" : props.isPayment ? "Make Payment" : null}</h4>
                </li>
              </ul>
              <ul className="navbar-nav d-flex justify-content-center">
                <li className="nav-item ml-auto">
                  <h4 className="navbar-brand">Lyka Checkout</h4>
                </li>
              </ul>
        </div>
      </div>
    </nav>
  );
};

export default CheckOutNav;
