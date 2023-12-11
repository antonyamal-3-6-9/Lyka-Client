import React, { useState } from "react";
import "../Profile/profile.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const ProfileSideBar = ({ options, setOptions }) => {

  const navigate = useNavigate();

  const [option, setOption] = useState(options);

  const changeRoute = (endpoint) => {
      console.log(options)
      navigate(`/account/${endpoint}`)
  }

  return (
    <>
      <div className="card m-0 rounded-0 d-flex">
      <Button 
        href={` ${option === "orders" ? "#text-icons" : "}`}
      />

        <a
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
        </a>
      </div>
    </>
  );
};

export default ProfileSideBar;
