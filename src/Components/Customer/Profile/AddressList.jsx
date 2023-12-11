import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';


const AddressList = ({savedAddress, setSavedAddress, isSavedAddress, setIsSavedAddress, setIsAddNewAddress}) => {

  const token = localStorage.getItem('token')
  const BASE_URL = "http://127.0.0.1:8000/address/"

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
          setIsSavedAddress(true)
          setSavedAddress(addressResponse.data);
        }
      } catch (error) {
        setIsSavedAddress(false)
       console.log(error)
      }
    };
    fetchData();
  }, [token]);

  if (isSavedAddress === null){
    return null
  }

  return (
    <>
      <div className="row m-0 p-0">
        {isSavedAddress ? (
         <>
          <div className="container-fluid d-flex justify-content-start p-0">
          <Button
              href="#text-buttons"
              onClick={() => {
                setIsAddNewAddress(true);
              }}
            startIcon={<AddIcon />}
            >
              Add New Address
            </Button>
          </div>
          <div className="row m-0 p-0">
            {savedAddress.map((address) => (
              <div className="col-lg-6 p-0">
                <div className="p-3 m-2 rounded-0 lyka-shadow">
                  <h5>{address.name}</h5>
                  <p className="m-0 p-0">
                    {address.street_one} {address.street_two} {address.landmark}
                  </p>
                  <p className="m-0 p-0">
                    {address.phone}, {address.alternate_phone}
                  </p>
                  <p className="m-0 p-0">
                    {address.city}, {address.state}
                  </p>
                  <p className="m-0 p-0">
                    {address.country}, {address.zip_code}
                  </p>
                  <div className="row m-3">
                  
                  <div className="col-lg-6 d-flex justify-content-center">
                  <Button href="#text-buttons" startIcon={<ModeEditIcon />}>Edit</Button>
                  </div>
                  <div className="col-lg-6">
                  <Button href="#text-buttons" startIcon={<DeleteIcon />}>Delete</Button>
                  </div>
                  
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
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
    </>
  );
};

export default AddressList