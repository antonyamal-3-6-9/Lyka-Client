import React, { useEffect, useState } from "react";
import "../Profile/profile.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DirectionsIcon from "@mui/icons-material/Directions";

const ProfileSideBar = ({ options, setOptions }) => {
  const navigate = useNavigate();
  const sm = window.matchMedia("(max-width: 767px)");
  const [smMedia, setSmMedia] = useState(null);
  const [option, setOption] = useState(options);

  const changeMedia = () => {
    if (sm.matches) {
      setSmMedia(true);
    } else {
      setSmMedia(false);
    }
  };

  window.addEventListener("resize", () => {
    changeMedia();
  });

  useEffect(() => {
    changeMedia();
  }, []);

  return (
    <>
      <div
        className={`m-0 rounded-0 d-flex border border-0 ${
          smMedia ? "justify-content-between" : "card"
        }`}
      >
        <Button
          variant={
            option === "orders"
              ? "contained" : "outlined"
          }
          onClick={() => {
            setOptions("orders");
            setOption("orders");
          }}
          size="large"
          startIcon={<ShoppingBasketIcon />}
          style={{
            borderColor: "#16213E",
            marginBottom: !smMedia ? "15px" : null,
            color: option === "orders" ? "#FFFFFF" : "#16213E",
            backgroundColor: option === "orders" ? "#16213E" : null,
            margin: smMedia ? "10px" : null,
          }}
        >
          Orders
        </Button>
        <Button
          variant={`${
            option === "profile" && smMedia === false ? "contained" : "outlined"
          } ${smMedia && "text"}`}
          onClick={() => {
            setOptions("profile");
            setOption("profile");
          }}
          size="large"
          style={{
            borderColor: "#16213E",
            color: option === "profile" ? "#FFFFFF" : "#16213E",
            marginBottom: !smMedia ? "15px" : null,
            backgroundColor: option === "profile" ? "#16213E" : null,
            margin: smMedia ? "10px" : null,
          }}
          startIcon={<PermIdentityIcon />}
        >
          Profile
        </Button>{" "}
        <Button
          variant={`${
            option === "address" && smMedia === false ? "contained" : "outlined"
          } ${smMedia && "text"}`}
          onClick={() => {
            setOptions("address");
            setOption("address");
          }}
          size="large"
          startIcon={<DirectionsIcon />}
          style={{
            borderColor: "#16213E",
            color: option === "address" ? "#FFFFFF" : "#16213E",
            marginBottom: !smMedia ? "15px" : null,
            backgroundColor: option === "address" ? "#16213E" : null,
            margin: smMedia ? "10px" : null,
          }}
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
