import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import FlashOff from "@mui/icons-material/FlashOff";
import FlashOn from "@mui/icons-material/FlashOn";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddNewChargeModal from "./AddNewCharge";
import CouponChargeActionModal from "./CouponChargeAction";
import Add from "@mui/icons-material/Add";

export default function () {
  const BASE_URL = "http://127.0.0.1:8000/payments/lyka-admin/";

  const [charges, setCharges] = useState([]);
  const [exists, setExists] = useState(null);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const [editChargeData, setEditChargeData] = useState({
    index: null,
    x: {},
  });

  const [delData, setDelData] = useState({
    id: null,
    index: null,
    x: null,
  });

  const fetchCharge = async () => {
    const token = localStorage.getItem("token");
    try {
      const chargeResponse = await axios.get(`${BASE_URL}charge/list/`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCharges(chargeResponse.data);
      setExists(true);
    } catch {
      setExists(false);
      alert("Error getting charges");
    }
  };

  useEffect(() => {
    fetchCharge();
  }, []);

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

  const handleDelete = async (id, index) => {
    const token = localStorage.getItem("token");
    try {
      const deletionResponse = await axios.delete(
        `${BASE_URL}charge/delete/${id}/`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDel(false);
      let tempCharges = [...charges];
      tempCharges.splice(index, 0);
      setCharges(tempCharges);
    } catch (error) {
      alert("error deleting");
    }
  };

  const toggleCharge = async (id, index) => {
    const token = localStorage.getItem("token");
    try {
      const toggleResponse = await axios.patch(
        `${BASE_URL}charge/toggle/${id}/`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempCharges = [...charges];
      tempCharges[index].active = !tempCharges[index].active
      setCharges(tempCharges);
    } catch (error) {
      alert("error toggling");
    }
  };

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleEdit = (i) => {
    setEditChargeData({ ...editChargeData, x: charges[i], index: i });
    setOpen(true);
    setEdit(true);
  };

  const initiateDelete = (id, index, x) => {
    setDelData({ ...delData, id: id, index: index, x: x });
    setDel(true);
  };

  if (exists === null) {
    return null;
  }

  return (
    <>
      <div className="row">
        {open && (
          <AddNewChargeModal
            open={open}
            setOpen={setOpen}
            edit={edit}
            charges={charges}
            setCharges={setCharges}
            BASE_URL={BASE_URL}
            editChargeData={editChargeData}
            setEditChargeData={setEditChargeData}
          />
        )}
        {del && (
          <CouponChargeActionModal
            open={del}
            setOpen={setDel}
            initiateChargeDeletion={handleDelete}
            x={delData}
          />
        )}
        <h5 className="h5 text-dark text-center">Charges</h5>
        <div className="mb-2">
          <Button
            startIcon={<Add />}
            onClick={handleAddNew}
            style={{ color: "#294B29" }}
          >
            Add new Charge
          </Button>
        </div>
        {exists ? (
          charges.map((charge, index) => (
            <div className="col-lg-4">
              <div
                style={{
                  border: "1px solid #789461",
                  borderRadius: "15px",
                  marginBottom: "40px",
                }}
                className="shadow p-4"
              >
                <div className="d-flex justify-content-evenly">
                  <h5 className="h5 text-dark">{charge.name}</h5>
                  <IconButton
                    onClick={() => {
                      handleEdit(index);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      initiateDelete(charge.id, index, "charge");
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <span className="text-dark">Rate: </span>
                    <span className="h6 text-dark">{charge.rate}</span>
                  </div>
                  <div className="col-lg-6">
                    <Button
                      onClick={() => {toggleCharge(charge.id, index)}}
                      startIcon={
                        charge.active ? (
                          <FlashOn style={{ color: "#294B29" }} />
                        ) : (
                          <FlashOff style={{ color: "red" }} />
                        )
                      }
                    >
                      {charge.active ? "Active" : "Inactive"}
                    </Button>
                  </div>
                  <div className="col-lg-12">
                    <span className="text-dark">Limit: </span>
                    <span className="text-dark h6">
                      On all products above{" "}
                      {formatAmountWithRupeeSymbol(charge.limit)}
                    </span>
                  </div>
                  <div className="col-lg-12">
                    <span className="text-dark">Added on: </span>
                    <span className="text-dark h6">
                      {formatDate(charge.added_on)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            <h5 className="h5 text-dark">No Charges Found</h5>
          </div>
        )}
      </div>
    </>
  );
}
