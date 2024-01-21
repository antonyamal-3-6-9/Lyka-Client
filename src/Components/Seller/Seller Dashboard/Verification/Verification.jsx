import React, { useEffect, useState } from "react";
import SellerBankVerification from "./SellerBankVerification";
import SellerGstVerification from "./SellerGstVerification";
import SellerIdVerification from "./SellerIdverification";
import SellerPanVerification from "./SellerPanVerification";
import VerificationBadge from "./VerificationBadge.jsx";
import axios from "axios";
import { Button, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const Verification = () => {
  const [verify, setVerify] = useState("Address");
  const [addressVerified, setAddressVerified] = useState(false);
  const [bankVerified, setBankVerified] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);
  const [panVerified, setPanVerified] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const verifiedResponse = await axios.get(
          `${BASE_URL}verified-or-not/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (verifiedResponse.data.address_verified) {
          setAddressVerified(true);
        }
        if (verifiedResponse.data.pan_verified) {
          setPanVerified(true);
        }
        if (verifiedResponse.data.bank_account_verified) {
          setBankVerified(true);
        }
        if (verifiedResponse.data.gstin_verified) {
          setGstVerified(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className="container-fluid w-75
      "
        style={{ marginTop: "83px" }}
      >
        <Item>
          <div className="d-flex justify-content-evenly">
            <Button
              onClick={() => setVerify("Address")}
              variant={verify === "Address" ? "outlined" : "text"}
              style={{ borderColor: "#3E3232", color: "#3E3232" }}
            >
              Address
            </Button>

            <Button
              onClick={() => setVerify("Bank")}
              variant={verify === "Bank" ? "outlined" : "text"}
              style={{ borderColor: "#3E3232", color: "#3E3232" }}
            >
              Bank
            </Button>

            <Button
              onClick={() => setVerify("Pan")}
              variant={verify === "Pan" ? "outlined" : "text"}
              style={{ borderColor: "#3E3232", color: "#3E3232" }}
            >
              Pan
            </Button>

            <Button
              onClick={() => setVerify("GST")}
              variant={verify === "GST" ? "outlined" : "text"}
              style={{ borderColor: "#3E3232", color: "#3E3232" }}
            >
              GST
            </Button>
          </div>
          <div className="row mt-5 d-flex justify-content-center align-items-center">
            {verify === "Address" &&
              (addressVerified ? (
                <VerificationBadge verify={verify} />
              ) : (
                <SellerIdVerification
                  setAddressVerified={setAddressVerified}
                  url={BASE_URL}
                />
              ))}
            {verify === "Bank" &&
              (bankVerified ? (
                <VerificationBadge verify={verify} />
              ) : (
                <SellerBankVerification
                  setBankVerified={setBankVerified}
                  url={BASE_URL}
                />
              ))}
            {verify === "GST" &&
              (gstVerified ? (
                <VerificationBadge verify={verify} />
              ) : (
                <SellerGstVerification
                  setGstVerified={setGstVerified}
                  url={BASE_URL}
                />
              ))}
            {verify === "Pan" &&
              (panVerified ? (
                <VerificationBadge verify={verify} />
              ) : (
                <SellerPanVerification
                  setPanVerified={setPanVerified}
                  url={BASE_URL}
                />
              ))}
          </div>
        </Item>
      </div>
    </>
  );
};

export default Verification;
