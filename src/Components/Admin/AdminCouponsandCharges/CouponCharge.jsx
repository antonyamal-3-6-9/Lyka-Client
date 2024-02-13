import React, { useState } from "react";
import { Paper, styled } from "@mui/material";
import AdminNavBar from "../AdminNavbar/AdminNavbar";
import Coupon from "./Coupon";
import Charge from "./Charge";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function CouponCharge({}) {
  const [isCoupon, setIsCoupon] = useState(true);

  const handleClick = () => {
    setIsCoupon(!isCoupon);
  };

  return (
    <>
      <AdminNavBar />
      <div className="container-fluid" style={{ marginTop: "83px" }}>
        <Item>
          <div className="d-flex justify-content-center">
            <span>
              <a
                className={`text-dark m-1 ${isCoupon ? "h5" : "h6"}`}
                onClick={handleClick}
              >
                Coupons
              </a>
            </span>
            <span> | </span>
            <span>
              <a
                className={`text-dark m-1 ${isCoupon ? "h6" : "h5"}`}
                onClick={handleClick}
              >
                Charges
              </a>
            </span>
          </div>
          {isCoupon ? <Coupon /> : <Charge />}
        </Item>
      </div>
    </>
  );
}
