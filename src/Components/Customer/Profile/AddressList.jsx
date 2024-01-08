import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditAddress from "./EditAddress"
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { CircleSharp } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddressList = ({
  savedAddress,
  setSavedAddress,
  isSavedAddress,
  setIsSavedAddress,
  setIsAddNewAddress,
}) => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [isEdit, setIsEdit] = useState(false);
  const [addressIdEdit, setAddressIdEdit] = useState(null)
  const [addressIndex, setAddressIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alertData, setAlertData] = useState("")
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

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
          setIsSavedAddress(true);
          setIsLoading(false)
          setSavedAddress(addressResponse.data);
        }
      } catch (error) {
        setIsSavedAddress(false);
        setAlertData("Address not found")
        setAlertEnable(true)
        setAlertSeverity("warning")
        setIsLoading(false)
      }
    };
    fetchData();
  }, [token]);

  if (isSavedAddress === null) {
    return null;
  }

  const handleDelete =  async (address_id, addressIndex) => {
    try{
      setIsLoading(true)
      const deleteResponse = await axios.delete(`${BASE_URL}delete-address/${address_id}/`, {
        headers: {
          "content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (deleteResponse.status === 200){
        const updatedAddress = [...savedAddress]
        updatedAddress.splice(addressIndex, 1)
        setSavedAddress(updatedAddress)
        setIsLoading(false)
      }
    } catch (error){
      setAlertData("error deleting address")
      setAlertEnable(true)
      setAlertSeverity("warning")
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container-fluid">
      <FloatingAlert
        message={alertData}
        setEnable={setAlertEnable}
        enable={setAlertEnable}
        severity={alertSeverity}
      />
      <Backdrop
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
        <Button
          variant="text"
          onClick={() => {
            setIsAddNewAddress(true);
          }}
          style={{ color: "#16213E" }}
          startIcon={<AddIcon />}
        >
          Add New Address
        </Button>

        <Item>
          {isEdit ? (
            <EditAddress 
              address_id={addressIdEdit}
              setEdit={setIsEdit}
              savedAddress={savedAddress}
              setSavedAddress={setSavedAddress}
              addressIndex={addressIndex}
            />
          ) : (
            <div className="row">
              {savedAddress.map((address, index) => (
                <>
                  <hr className="lyka-color"></hr>
                  <div className="col-lg-12">
                    <h6 className="h6 text-dark">{address.name}</h6>
                    <p className="m-0 p-0 text-dark">
                      {address.street_one}, {address.street_two}, {address.landmark}
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
                    <div className="row m-3">
                      <div className="col-lg-6 d-flex justify-content-center">
                        <Button
                          style={{ color: "#16213E" }}
                          startIcon={<ModeEditIcon />}
                          onClick={() => {setIsEdit(true); setAddressIdEdit(address.id); setAddressIndex(index)}}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          style={{ color: "#16213E" }}
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(address.id, index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                  <hr className="lyka-color"></hr>
                </>
              ))}
            </div>
          )}
        </Item>
      </div>
    </>
  );
};

export default AddressList;
