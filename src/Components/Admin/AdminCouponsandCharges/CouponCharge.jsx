import React from "react";
import { Paper, styled } from "@mui/material";
import AdminNavBar from "../AdminNavbar/AdminNavbar";
import Coupon from "./Coupon";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));


export default function CouponCharge({}){
    return(<>
        <AdminNavBar/>
        <div className="container-fluid" style={{marginTop: "83px"}}>
            <Item>
                <Coupon/>
            </Item>
        </div>
    </>)
}