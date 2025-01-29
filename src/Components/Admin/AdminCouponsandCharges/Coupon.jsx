import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Divider } from "@mui/material";
import AddNewCouponModal from "./AddNewCoupon";
import axios from "axios";
import CouponChargeActionModal from "./CouponChargeAction";

export default function Coupon({}) {
  const BASE_URL = "http://127.0.0.1:8000/payments/lyka-admin/";

  const [coupons, setCoupons] = useState([]);
  const [exist, setExist] = useState(null);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const [editData, setEditData] = useState({
    x: {},
    index: 0,
  });

  const [delData, setDelData] = useState({
    id: null,
    index: null,
    x: null,
  });

  const fetchCoupons = async () => {
    const token = localStorage.getItem("token");
    try {
      const couponResponse = await axios.get(`${BASE_URL}coupon/list/`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(couponResponse.data);
      setExist(true);
    } catch (error) {
      setExist(false);
      alert("error fetching");
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

  const formatAmountWithRupeeSymbol = (amount) => {
    amount = parseInt(amount);
    if (typeof amount !== "number" || isNaN(amount)) {
      return "Invalid Amount";
    }
    const formattedAmount = amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });

    return formattedAmount;
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleEdit = (i) => {
    setEditData({ ...editData, x: { ...coupons[i] }, index: i });
    setEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id, index) => {
    const token = localStorage.getItem("token");
    try {
      const deleteResponse = await axios.delete(
        `${BASE_URL}coupon/delete/${id}/`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempCoupons = [...coupons];
      tempCoupons.splice(index, 1);
      setCoupons(tempCoupons);
      setDel(false);
    } catch (error) {
      alert("Error deleting coupon");
    }
  };

  const toggleCoupon = async (id, index) => {
    console.log(id)
    const token = localStorage.getItem("token");
    try {
      const toggleResponse = await axios.patch(
        `${BASE_URL}coupon/toggle/${id}/`,
        {},
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempCoupons = [...coupons];
      tempCoupons[index].is_active = !tempCoupons[index].is_active;
      setCoupons(tempCoupons);
    } catch (error) {
      console.log(error)
      alert("error toggling coupons");
    }
  };

  const initiateDelete = (id, index, x) => {
    setDel(true);
    setDelData({ ...delData, id: id, index: index, x: x });
  };

  if (exist === null) {
    return null;
  }

  return (
    <>
      <div className="row">
        {open && (
          <AddNewCouponModal
            open={open}
            setOpen={setOpen}
            edit={edit}
            editCouponData={editData}
            setEditCouponData={setEditData}
            coupons={coupons}
            setCoupons={setCoupons}
            BASE_URL={BASE_URL}
            setEdit={setEdit}
          />
        )}
        {del && (
          <CouponChargeActionModal
            open={del}
            setOpen={setDel}
            initiateCouponDeletion={handleDelete}
            x={delData}
          />
        )}
        <div className="mb-2">
          <Button
            startIcon={<Add />}
            style={{ color: "#294B29" }}
            onClick={handleAdd}
          >
            Add New Coupon
          </Button>
        </div>
        {exist ? (
          coupons.map((coupon, index) => (
            <div className="col-lg-4">
              <div
                style={{
                  border: "1px solid #789461",
                  borderRadius: "15px",
                  marginBottom: "40px",
                }}
                className="shadow p-4"
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <h5 className="h5 text-dark mb-2">{coupon.code}</h5>
                      <Divider />
                    </div>
                    <p className="text-dark">{coupon.description}</p>
                  </div>
                  <div className="d-flex justify-content-evenly align-items-start">
                    <IconButton
                      onClick={() => {
                        handleEdit(index);
                      }}
                    >
                      <EditIcon style={{ color: "#294B29" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        initiateDelete(coupon.id, index, "coupon");
                      }}
                    >
                      <DeleteForeverIcon style={{ color: "#294B29" }} />
                    </IconButton>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7 mb-3">
                    <span className="text-dark">Min Purchase: </span>
                    <span className="text-dark h6">
                      {formatAmountWithRupeeSymbol(
                        coupon.minimum_purchase_amount
                      )}
                    </span>
                  </div>
                  <div className="col-lg-5 mb-2 d-flex justify-content-start align-items-center">
                    <Button
                      onClick={() => {
                        toggleCoupon(coupon.id, index);
                      }}
                      style={{
                        color: coupon.is_active ? "#294B29" : "darkred",
                      }}
                      startIcon={
                        coupon.is_active ? <FlashOnIcon /> : <FlashOffIcon />
                      }
                    >
                      {coupon.is_active ? "Active" : "Inactive"}
                    </Button>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <span className="text-dark">Max Discount: </span>
                    <span className="text-dark h6">
                      {formatAmountWithRupeeSymbol(
                        coupon.maximum_discount_amount
                      )}
                    </span>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <span className="text-dark">Discount Rate: </span>
                    <span className="h6 text-dark">
                      {coupon.discount_percentage} %
                    </span>
                  </div>
                  <div className="col-lg-5 mb-3">
                    <span className="text-dark">Max Limit: </span>
                    <span className="h6 text-dark">
                      {coupon.max_usage_limit}
                    </span>
                  </div>
                  <div className="col-lg-7 mb-3">
                    <span className="text-dark">Added On: </span>
                    <span className="h6 text-dark">
                      {formatDate(coupon.created_at)}
                    </span>
                  </div>
                  <div className="col-lg-8 mb-3">
                    <span className="text-dark">Valid Till: </span>
                    <span className="h6 text-dark">
                      {formatDate(coupon.end_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            <h5 className="h5 text-dark">No Coupons Found</h5>
          </div>
        )}
      </div>
    </>
  );
}
