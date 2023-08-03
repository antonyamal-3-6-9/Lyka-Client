import React, { useEffect, useState } from "react";
import VerifyNav from "./VerifyNav";
import SellerBankVerification from "./SellerBankVerification";
import SellerGstVerification from "./SellerGstVerification";
import SellerIdVerification from "./SellerIdverification";
import SellerPanVerification from "./SellerPanVerification";
import VerificationBadge from "./VerificationBadge.jsx";
import axios from "axios";

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
      <div className="container-fluid mt-3 p-5">
        <VerifyNav verify={setVerify} />
        <div className="row p-5 m-5 d-flex justify-content-center align-items-center">
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
      </div>
    </>
  );
};

export default Verification;
