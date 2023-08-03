import React from "react";
import axios from "axios";
import AddNewAddressForm from "./AddNewAddressForm";
import { useState } from "react";
import { useEffect } from "react";

const CheckoutAddress = (props) => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [savedAddress, setSavedAddress] = useState();
  const [isSavedAddress, setIsSavedAddress] = useState(false);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const onContinue = async () => {
    if (props.addessId !== 0){
      if(await props.addressAdding()){
        props.setAddressAdded(false)
        props.setIsPayment(true)
      } else {
        console.log("error adding address")
      }
    } else {
      console.log("select an address before continuing")
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
          console.log(addressResponse);
          setSavedAddress(addressResponse.data);
          const id = addressResponse.data[0].id
          props.setAddressId(id)
          setIsSavedAddress(true);
        }
      } catch (error) {
        console.log(error);
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
      <div className="container-fluid">
        <div className="row">
          {isSavedAddress ? (
            <div className="row">
              {savedAddress.map((address) => (
                <div className="col-lg-12 p-3 border border-3 border-dark">
                <input
                  type="radio"
                  className="form-radio"
                  name={`address-radio-${address.id}`}
                  value={address.id}
                  onChange={handleRadioChange}
                  checked={parseInt(props.addressId) === address.id}
                  
                />
                  <h5>{address.name}</h5>
                  <p>{address.street_one}</p>
                  <p>
                    {address.street_two}, {address.landmark}
                  </p>
                  <p>
                    {address.phone}, {address.alternate_phone}
                  </p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.country}, {address.zip_code}
                  </p>
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
      <div className="row">
        <button
          className="btn btn-outline-warning"
          onClick={() => {
            setIsAddNewAddress(true);
          }}
        >
          Add new address
        </button>
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
      <div className="row">
        <button className="btn btn-outline-success" onClick={onContinue}>
          Continue
        </button>
      </div>
    </>
  );
};
export default CheckoutAddress;
