import React, { useState } from "react";
import "../Profile/profile.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DirectionsIcon from '@mui/icons-material/Directions';


const ProfileSideBar = ({ options, setOptions }) => {

  const navigate = useNavigate();

  const [option, setOption] = useState(options);
  const [isActive, setIsActive] = useState(true)

  return (
    <>
      <div className="card m-0 rounded-0 d-flex border border-0">
      <Button 
        variant={`${option === "orders" ? "contained" : "outlined"}`}
        onClick={() => {
            setOptions("orders");
            setOption("orders");
          }}
          size="large"
          style={{marginBottom : "15px"}}
          startIcon={<ShoppingBasketIcon/>}
          >
            Orders
          </Button>
          <Button 
        variant={`${option === "profile" ? "contained" : "outlined"}`}
        onClick={() => {
            setOptions("profile");
            setOption("profile");
          }}
          size="large"
          style={{marginBottom : "15px"}}
          startIcon={<PermIdentityIcon/>}
          >
            Profile
          </Button>      <Button 
        variant={`${option === "address" ? "contained" : "outlined"}`}
        onClick={() => {
            setOptions("address");
            setOption("address");
          }}
          size="large"
          startIcon={<DirectionsIcon/>}
          >
            Address
          </Button>
        {/* <a
          onClick={() => {
            setOptions("orders");
            setOption("orders");
            changeRoute("orders");
          }}
          className={` text-center m-2 p-3 option  ${
            option === "orders" ? "option-active m-3" : null
          }`}
        >
          <span className={`${option === "orders" ? "option-active" : null}`}>
            My Orders
          </span>
        </a>
        <a
          onClick={() => {
            setOptions("profile");
            setOption("profile");
            changeRoute("profile");
          }}
          className={` text-center m-2 p-3 option  ${
            option === "profile" ? "option-active m-3" : null
          }`}
        >
          <span className={`${option === "profile" ? "option-active" : null}`}>
            Personal Information
          </span>
        </a>
        <a
          onClick={() => {
            setOptions("address");
            setOption("address");
            changeRoute("address");
          }}
          className={` text-center m-2 p-3 option  ${
            option === "address" ? "option-active m-3" : null
          }`}
        >
          <span className={`${option === "address" ? "option-active" : null}`}>
            My Address
          </span>
        </a> */}
      </div> 
    </>
  );
};

export default ProfileSideBar;
