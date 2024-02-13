import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  styled,
  Paper,
  Modal,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Edit from "@mui/icons-material/Edit";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function AddNewChargeModal({
  open = true,
  setOpen,
  edit = false,
  setEdit = null,
  editChargeData = null,
  setEditChargeData = null,
  charges,
  setCharges,
  BASE_URL,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const [addChargeData, setAddChargeData] = useState({
    name: null,
    rate: null,
    limit: null,
  });

  const handleChange = (e) => {
    if (edit) {
      setEditChargeData({...editChargeData, x : {...editChargeData.x, [e.target.name] : e.target.value}})
    } else {
      setAddChargeData({...addChargeData, [e.target.name] : e.target.value})
    }
  }

  const addNewCharge = async () => {

    if (addChargeData.name.length <= 0 || addChargeData.name.length > 25){
      return;
    }

    if (parseFloat(addChargeData.rate) >= 25 || parseFloat(addChargeData.rate) <= 0){
      return;
    }

    if (parseFloat(addChargeData.limit) <= 0){
      return;
    }

    const token = localStorage.getItem('token')
    try{
      const addNewResponse = await axios.post(`${BASE_URL}charge/create/`,
      {
        name: addChargeData.name,
        rate: addChargeData.rate,
        limit: addChargeData.limit,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(addNewResponse.data)
      let tempCharges = [...charges]
      tempCharges.push(addNewResponse.data)
      setCharges(tempCharges)
      setOpen(false)
    } catch (error) {
      alert("error adding coupon")
    }
  }


  const editCharge = async () => {

    if (editChargeData.x.name.length <= 0){
      return;
    }

    if (editChargeData.x.rate >= 25 && editChargeData.x.rate <= 0){
      return;
    }

    if (editChargeData.x.limit <= 0){
      return;
    }

    const token = localStorage.getItem('token')
    try{
      const editChargeResponse = await axios.patch(`${BASE_URL}charge/update/${editChargeData.x.id}/`,  
      editChargeData.x,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      let tempCharges = [...charges]
      tempCharges[editChargeData.index] = editChargeResponse.data;
      setCharges(tempCharges)
      setOpen(false)
      setEdit(false)
    } catch (error) {
      alert("error editing charge")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (edit){
      editCharge()
    } else {
      addNewCharge()
    }
  }

  const handleClose = () => {
    if (edit) {
      setEdit(false)
    }
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Item style={style}>
          <h5 className="h6 text-dark text-center">Add New Coupon</h5>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-evenly">
              <div className="col-lg-12">
                <TextField
                  name="name"
                  type="text"
                  value={edit ? editChargeData.x.name : addChargeData.name}
                  fullWidth
                  variant="standard"
                  label="Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6">
                <TextField
                  name="rate"
                  type="number"
                  value={edit ? editChargeData.x.rate : addChargeData.rate}
                  variant="standard"
                  fullWidth
                  label="Rate"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6">
                <TextField
                  name="limit"
                  type="number"
                  value={edit ? editChargeData.x.limit : addChargeData.limit}
                  label="Minimum Purchase"
                  fullWidth
                  required
                  variant="standard"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#294B29" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Item>
      </Modal>
    </>
  );
}
