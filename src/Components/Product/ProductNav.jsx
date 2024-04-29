import React from "react";
import { Button } from "@mui/material";
import DropDown from "./PDropdown";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const ProductNav = ({initiateSort}) => {
  return (
    <>
      <div className="d-flex justify-content-start">
        <Button
        startIcon={<HomeIcon/>}
        style={{color: "#16213E"}}
        >
        <Link
        to="/"
        style={{color: "#16213E"}}
        >
        Back to home
        </Link>
        </Button>
        <DropDown
          initiateSort={initiateSort}
        />
      </div>
    </>
  );
};

export default ProductNav;
