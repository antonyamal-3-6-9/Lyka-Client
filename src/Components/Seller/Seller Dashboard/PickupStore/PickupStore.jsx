import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import { Paper, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Backdrop, CircularProgress } from "@mui/material";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const PickupStore = () => {
  const [isStoreExists, setIsStoreExists] = useState(null);
  const [pickupStores, setPickupStores] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [loading, setLoading] = useState(false)

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  Modal.setAppElement("#root");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true)
        const pickupResponse = await axios.get(`${BASE_URL}get-store/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false)
        if (pickupResponse.status === 200) {
          if (pickupResponse.data.length === 0) {
            setIsStoreExists(false);
          } else {
            setIsStoreExists(true);
            setPickupStores(pickupResponse.data);
            console.log(pickupResponse);
          }
        }
      } catch (error) {
        console.log(error);
        setIsStoreExists(false);
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    setShowConfirmation(false);
    const token = localStorage.getItem("token");
    try {
      setLoading(true)
      const deleteAddressResponse = await axios.delete(
        `${BASE_URL}delete-store/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(deleteAddressResponse);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  if (isStoreExists === null) {
    return null;
  }

  return (
    <>
      <div className="container-fluid w-75" style={{ marginTop: "83px" }}>
      <Backdrop>
        <CircularProgress/>
      </Backdrop>
        <Modal
          isOpen={showConfirmation}
          onRequestClose={handleCancelDelete}
          style={{
            content: {
              width: "400px",
              margin: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "20px",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Confirm Delete</h2>
          <p style={{ marginBottom: "20px" }}>
            Are you sure wanna delete the address ?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => handleConfirm(idToDelete)}
            >
              Yes
            </button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </Modal>
        {isStoreExists ? (
          <Button variant="text" style={{ color: "#3E3232"  }} startIcon={<AddIcon/>}>
            <Link to="/seller/add-store" style={{ color: "#3E3232" }}>Add New Inventory</Link>
          </Button>
        ) : (
          <div className="container-fluid w-75 h-100">
            <div className="row h-100 d-flex align-items-center justify-content-center">
              <h4 className="text-center">
                You haven't added any Stores yet, add a new store to start
                Selling
              </h4>
              <Link
                to="/seller/add-store"
                className="btn btn-outline-dark w-25 text-center"
              >
                Add New
              </Link>
            </div>
          </div>
        )}
        {pickupStores.map((store) => (
          <Item>
            <div className="row" key={store.store_id}>
              <div className="col-md-4 col-sm-12 col-xs-12 d-flex align-items-center justify-content-center">
                <img
                  src={"http://localhost:8000" + store.store_address.image}
                  width="200px"
                />
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-12 pb-5">
                    <h4 className="h4 text-dark">
                      {store.store_address.store_name}
                    </h4>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.street_one}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.street_two}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.city}, {store.store_address.state}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.country},{" "}
                      {store.store_address.zip_code}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.landmark}
                    </p>
                    <p className="m-0 p-0 text-dark">
                      {store.store_address.phone},{" "}
                      {store.store_address.alternate_phone}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "red" }}
                          onClick={() => handleDelete(store.store_id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="col-lg-6 mb-2">
                        <Button variant="contained" style={{ backgroundColor: "#3E3232" }}>
                          <Link
                          style={{color: "white"}}
                            to={`/seller/edit-address/${store.store_address.id}`}
                          >
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Item>
        ))}
      </div>
    </>
  );
};

export default PickupStore;
