import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ItemNav = () => {
  return (
    <>
      <div className="d-flex">
        <Button>
          <Link to="/seller/products" style={{color: "#3E3232"}}>
            Cancel
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ItemNav;
