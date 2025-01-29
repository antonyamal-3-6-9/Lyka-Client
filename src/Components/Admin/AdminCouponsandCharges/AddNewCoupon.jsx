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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function AddNewCouponModal({
  open = true,
  setOpen,
  edit = false,
  setEdit = null,
  editCouponData = null,
  setEditCouponData = null,
  coupons,
  setCoupons,
  BASE_URL,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const [addCouponData, setAddCouponData] = useState({
    code: null,
    description: null,
    maximum_discount_amount: null,
    minimum_purchase_amount: null,
    discount_percentage: null,
    max_usage_limit: null,
    end_date: null,
  });

  const handleChange = (e) => {
    if (edit) {
      setEditCouponData({
        ...editCouponData,
        x: { ...editCouponData.x, [e.target.name]: e.target.value },
      });
    } else {
      setAddCouponData({ ...addCouponData, [e.target.name]: e.target.value });
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }


  useEffect(() => {
    if (edit){
      const date = formatDate(editCouponData.x.end_date)
      setEditCouponData({...editCouponData, x :{...editCouponData.x, end_date: date}})
    }
  }, [])

  const addNewCoupon = async () => {
    if (
      parseInt(addCouponData.maximum_discount_amount) > 10000 ||
      parseInt(addCouponData.maximum_discount_amount) < 100
    ) {
      alert("Max discount must be in between 100 & 10 000");
      return;
    }

    if (
      parseInt(addCouponData.minimum_purchase_amount) < 500 ||
      parseInt(addCouponData.minimum_purchase_amount > 10000)
    ) {
      alert("Min purchase must be between 500 and 10 000");
      return;
    }

    if (
      parseInt(addCouponData.discount_percentage) < 1 ||
      parseInt(addCouponData.discount_percentage > 99)
    ) {
      alert("Rate must be between one and 99");
      return;
    }

    if (
      parseInt(addCouponData.max_usage_limit) > 10 ||
      parseInt(addCouponData.max_usage_limit) < 1
    ) {
      alert("Limit must be between ten and one");
      return;
    }

    const defaultDate = new Date(addCouponData.end_date);
    const currentDate = new Date();
    if (defaultDate < currentDate) {
      alert("Enter a valid date");
      return;
    }

    const token = localStorage.getItem("token");

    console.log(addCouponData);

    try {
      const addResponse = await axios.post(
        `${BASE_URL}coupon/create/`,

        addCouponData,

        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      alert("success");
      let tempCoupons = [...coupons];
      tempCoupons.push(addResponse.data);
      setCoupons(tempCoupons);
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };



  const editCoupon = async () => {
    if (
      parseInt(editCouponData.x.maximum_discount_amount) > 10000 ||
      parseInt(editCouponData.x.maximum_discount_amount) < 100
    ) {
      alert("Max discount must be in between 100 & 10 000");
      return;
    }

    if (
      parseInt(editCouponData.x.minimum_purchase_amount) < 500 ||
      parseInt(editCouponData.x.minimum_purchase_amount > 10000)
    ) {
      alert("Min purchase must be between 500 and 10 000");
      return;
    }

    if (
      parseInt(editCouponData.x.discount_percentage) < 1 ||
      parseInt(editCouponData.x.discount_percentage > 99)
    ) {
      alert("Rate must be between one and 99");
      return;
    }

    if (
      parseInt(editCouponData.x.max_usage_limit) > 10 ||
      parseInt(editCouponData.x.max_usage_limit) < 1
    ) {
      alert("Limit must be between ten and one");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const editResponse = await axios.patch(
        `${BASE_URL}coupon/update/${editCouponData.x.id}/`,
         editCouponData.x,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      setEdit(false)
      alert("success");
      let tempCoupons = [...coupons];
      tempCoupons[editCouponData.index] = editResponse.data;
      setCoupons(tempCoupons);
    } catch (error) {
      alert("error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      editCoupon();
    } else {
      addNewCoupon();
    }
  };

  const handleClose = () => {
    if (edit){
      setEdit(false)
    }
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Item style={style}>
          <h5 className="h6 text-dark text-center">Add New Coupon</h5>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-evenly">
              <div className=" col-lg-4 mt-2 mb-3">
                <TextField
                  type="text"
                  name="code"
                  fullWidth
                  value={edit ? editCouponData.x.code : addCouponData.code}
                  variant="standard"
                  label="Coupon Code"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className=" col-lg-4 mt-2 mb-3">
                <TextField
                  type="number"
                  name="minimum_purchase_amount"
                  value={
                    edit
                      ? editCouponData.x.minimum_purchase_amount
                      : addCouponData.minimum_purchase_amount
                  }
                  fullWidth
                  variant="standard"
                  label="Minimum Purchase Amount"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className=" col-lg-4 mt-2 mb-3">
                <TextField
                  type="number"
                  name="maximum_discount_amount"
                  value={
                    edit
                      ? editCouponData.x.maximum_discount_amount
                      : addCouponData.maximum_discount_amount
                  }
                  fullWidth
                  variant="standard"
                  label="Maximum Discount Amount"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className=" col-lg-3 mt-2 mb-3">
                <TextField
                  type="number"
                  name="discount_percentage"
                  value={
                    edit
                      ? editCouponData.x.discount_percentage
                      : addCouponData.discount_percentage
                  }
                  fullWidth
                  variant="standard"
                  label="Discount Rate"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className=" col-lg-3 mt-2 mb-3">
                <TextField
                  type="number"
                  name="max_usage_limit"
                  value={
                    edit
                      ? editCouponData.x.max_usage_limit
                      : addCouponData.max_usage_limit
                  }
                  fullWidth
                  variant="standard"
                  label="Max Usage Limit"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-4 d-flex justify-content-evenly align-items-center mt-4 mb-3">
                <InputLabel>Valid Till:</InputLabel>
                <TextField
                  type="date"
                  name="end_date"
                  value={
                    edit ? editCouponData.x.end_date : addCouponData.end_date
                  }
                  variant="standard"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={
                    edit
                      ? editCouponData.x.description
                      : addCouponData.description
                  }
                  variant="standard"
                  label="Description"
                  required
                  cols="50"
                  rows="3"
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
