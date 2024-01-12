import React from "react";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ArrowLeft } from "@mui/icons-material";

const CheckOutNav = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          {" "}
          <Button variant="text" onClick={props.handleCancel} startIcon={<ClearIcon/>} style={{color: "#16213E"}}>
            Cancel
          </Button>
        </div>
        <div className="col-lg-4">

        </div>
        <div className="col-lg-4 d-flex justify-content-end">
          {props.isPayment && (
            <Button
              variant="text"
              onClick={() => {
                props.setAddressAdded(true);
                props.setIsPayment(false);
              }}
              startIcon={<ArrowLeft/>}
              style={{color: "#16213E"}}
            >
              GoBack
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckOutNav;
