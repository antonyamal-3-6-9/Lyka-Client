import React from "react";
import SellerBasicRegistration from "./SellerBasicRegistration";
import "./registration.css";
import { styled, Paper } from "@mui/material";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const Registration = () => {
  const BASE_URL = "http://127.0.0.1:8000/seller/";

  return (
    <>
      <div className="container-fluid" id="registration-container" style={{marginTop: "20px"}}>
      <Page>
        <h2 className="text-center">Register Here</h2>
        <SellerBasicRegistration url={BASE_URL} />
        </Page>
      </div>
    </>
  );
};

export default Registration;
