import React from "react";
import axios from "axios";
import AddNewAddressForm from "./AddNewAddressForm";
import { useState } from "react";
import { useEffect } from "react";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

const CheckoutAddress = (props) => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [savedAddress, setSavedAddress] = useState();
  const [isSavedAddress, setIsSavedAddress] = useState(false);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

  const onContinue = async () => {
    if (props.addessId !== 0){
      if(await props.addressAdding()){
        props.setAddressAdded(false)
        props.setIsPayment(true)
      }
    } else {
      setAlertData("Select an address before proceeding")
      setAlertEnable(true)
      setAlertSeverity("info")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          const id = addressResponse.data[0].id
          props.setAddressId(id)
          setIsSavedAddress(true);
        }
      } catch (error) {
        setIsSavedAddress(false);
      }
    };
    fetchData();
  }, [token]);
 
  const handleRadioChange = (e) => {
    console.log(e.target.value, props.addressId)
    props.setAddressId(e.target.value)
    setIsSelected(true)
    
  }

  return (
    <>
      <div className="container-fluid m-0 p-0">
      <FloatingAlert 
        message={alertData}
        setEnable={setAlertEnable}
        enable={alertEnable}
        severity={alertSeverity}
      />
        <div className="row m-0 p-0">
          {isSavedAddress ? (
            <div className="row m-0 p-0">
              {savedAddress.map((address) => (
                <div className="col-lg-6">
                <div className="card p-3 m-3">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`address-radio-${address.id}`}
                  value={address.id}
                  onChange={handleRadioChange}
                  checked={parseInt(props.addressId) === address.id}
                  
                />
                  <h5>{address.name}</h5>
                  <p className="m-0 p-0">{address.street_one} {address.street_two} {address.landmark}</p>
                  <p className="m-0 p-0">
                    {address.phone}, {address.alternate_phone}
                  </p>
                  <p className="m-0 p-0">
                    {address.city}, {address.state}
                  </p>
                  <p className="m-0 p-0">
                    {address.country}, {address.zip_code}
                  </p>
                </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {isAddNewAddress && (
        <div className="container-fluid">
          <AddNewAddressForm
            setSavedAddress={setSavedAddress}
            savedAddress={savedAddress}
            setIsAddNewAddress={setIsAddNewAddress}
            setAddressId={props.setAddressId}
          />
        </div>
      )}
      {!isAddNewAddress && 
      <>
      <div className="row d-flex justify-content-center">
        <button className="btn btn-success w-25" onClick={onContinue}>
          Continue
        </button>
      </div>
      <div className="row d-flex justify-content-center">
        <button
          className="btn btn-primary w-25"
          onClick={() => {
            setIsAddNewAddress(true);
          }}
        >
          Add new address
        </button>
      </div>
      </>}
    </>
  );
};
export default CheckoutAddress;
