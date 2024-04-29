import React from "react";
import "../home.css";
import logo from "../images/logo.jpeg";
import Cat from "../categories/CategoryTwo";
import { Button, Divider } from "@mui/material";

export default function Intro({}) {
  return (
    <>
      <div
        className="container-fluid m-0 p-0 mb-5"
        style={{ backgroundColor: "#E2F1F6" }}
      >
        <Cat />
        <Divider />
        <div className="row">
          <div className="col-lg-5 d-flex flex-column justify-content-start mt-5 ms-5 align-items-center">
            <div className="d-flex justify-content-center p-3">
              <span className="h1 text-dark text-center" style={{ fontSize: "4rem" }}>
                Experience Online Shopping Like Never Before!
              </span>
            </div>
            <div className="d-flex justify-content-center">
              <span className="h6 mt-2 p-3 text-dark text-center">
                LYKA is a marketplace where u can find high quality products
                from verified seller all over India.
              </span>
            </div>
            <div className="d-flex justify-content-start">
              <Button
                variant="contained"
                style={{ backgroundColor: "#16213E", marginTop: "20px" }}
              >
                Register Now
              </Button>
            </div>
          </div>
          <div
            className="col-lg-6 d-flex justify-content-end align-items-center p-5"
            style={{ height: "80vh" }}
          >
            <img src={logo} width="70%" id="intro-image"></img>
          </div>
        </div>
      </div>
    </>
  );
}
