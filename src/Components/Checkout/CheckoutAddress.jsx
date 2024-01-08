import React from "react";
import axios from "axios";
import AddNewAddressForm from "./AddNewAddressForm";
import { useState } from "react";
import { useEffect } from "react";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { ClearIcon } from "@mui/icons-material/Clear";
import { Add, ArrowRight } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));


const CheckoutAddress = (props) => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [savedAddress, setSavedAddress] = useState();
  const [isSavedAddress, setIsSavedAddress] = useState(false);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alertData, setAlertData] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");

  const onContinue = async () => {
    setIsLoading(true)
    if (props.addessId !== 0) {
      if (await props.addressAdding()) {
        props.setAddressAdded(false);
        props.setIsPayment(true);
        setIsLoading(false)
      }
    } else {
      setAlertData("Select an address before proceeding");
      setAlertEnable(true);
      setAlertSeverity("info");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const addressResponse = await axios.get(
          `${BASE_URL}get-customer-address/`,
          {
            headers: {
              "content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (addressResponse.status === 200) {
          setSavedAddress(addressResponse.data);
          const id = addressResponse.data[0].id;
          props.setAddressId(id);
          setIsSavedAddress(true);
          setIsLoading(false)
        }
      } catch (error) {
        setIsSavedAddress(false);
        setIsLoading(false)
      }
    };
    fetchData();
  }, [token]);

  const handleRadioChange = (e) => {
    console.log(e.target.value, props.addressId);
    props.setAddressId(e.target.value);
    setIsSelected(true);
  };

  return (
    <>
      <FloatingAlert
        message={alertData}
        setEnable={setAlertEnable}
        enable={alertEnable}
        severity={alertSeverity}
      />
      <Backdrop
        open={isLoading}
      >
        <CircularProgress/>
      </Backdrop>
      {isSavedAddress && !isAddNewAddress ? (
        <Item style={{ margin: "10px" }}>
          <div className="row m-0 p-0">
            {savedAddress.map((address) => (
              <>
                <hr></hr>

                <div className="col-lg-12 m-0 p-0">
                  <div className="p-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`address-radio-${address.id}`}
                      value={address.id}
                      onChange={handleRadioChange}
                      checked={parseInt(props.addressId) === address.id}
                    />
                    <h6 className="h6 mt-3 mb-1 text-dark">{address.name}</h6>
                    <p className="m-0 p-0 text-dark">
                      {address.street_one} {address.street_two}{" "}
                      {address.landmark}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {address.phone}, {address.alternate_phone}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {address.city}, {address.state}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {address.country}, {address.zip_code}
                    </p>
                  </div>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        </Item>
      ) : !isSavedAddress && !isAddNewAddress ? (
        <div className="row">
          <h4>No Saved Addressess</h4>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setIsAddNewAddress(true);
            }}
          >
            Add Address
          </button>
        </div>
      ) : null}
      {isAddNewAddress && (
        <div className="container-fluid" id="add-new-address-container">
          <AddNewAddressForm
            setSavedAddress={setSavedAddress}
            savedAddress={savedAddress}
            setIsAddNewAddress={setIsAddNewAddress}
            setAddressId={props.setAddressId}
          />
        </div>
      )}
      {!isAddNewAddress && savedAddress && (
        <>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              endIcon={<ArrowRight />}
              onClick={onContinue}
              style={{ backgroundColor: "#16213E", margin: "20px" }}
            >
              Continue
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIsAddNewAddress(true);
              }}
              startIcon={<AddIcon />}
              style={{ backgroundColor: "#0F3460", margin: "20px" }}
            >
              Add new
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default CheckoutAddress;
