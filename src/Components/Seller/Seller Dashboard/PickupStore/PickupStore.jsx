import React, { useEffect, useState } from "react";
import PickupNav from "./PickupNav";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from 'react-modal'

const PickupStore = () => {
  const [isStoreExists, setIsStoreExists] = useState(null);
  const [pickupStores, setPickupStores] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)

  const BASE_URL = "http://127.0.0.1:8000/seller/";

  Modal.setAppElement('#root');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const pickupResponse = await axios.get(`${BASE_URL}get-store/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (pickupResponse.status === 200) {
          if (pickupResponse.data.length === 0) {
            setIsStoreExists(false);
            console.log("hyy")
          } else {
          setIsStoreExists(true);
          setPickupStores(pickupResponse.data);
          console.log(pickupResponse)
          }
        }
      } catch (error) {
        console.log(error);
        setIsStoreExists(false)
      }
    };
    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    setShowConfirmation(false)
    const token = localStorage.getItem("token");
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setIdToDelete(id)
    setShowConfirmation(true)
}


const handleCancelDelete = () => {
    setShowConfirmation(false)
}

if(isStoreExists === null){
  return null
}

  return (
    <>
      <div className="container-fluid w-75 mt-5  pt-3">
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
            <button style={{ marginRight: "10px" }} onClick={() => handleConfirm(idToDelete)}>
              Yes
            </button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </Modal>
        {isStoreExists ? (
          <PickupNav />
        ) : (
          <div className="container-fluid w-75 h-100">
            <div className="row h-100 d-flex align-items-center justify-content-center">
              <h4 className="text-center">
                You haven't added any Stores yet, add a new store to start Selling
              </h4>
              <Link
                to="/seller/add-store"
                className="btn btn-outline-dark w-25 text-center"
              >
                Add Now
              </Link>
            </div>
          </div>
        )}
        {pickupStores.map((store) => (
          <div className="card p-3 mt-3">
                <div className="row" key={store.store_id}>
                  <div className="col-md-6 col-sm-12 col-xs-12 d-flex align-items-center justify-content-center">
                      <img
                        src={
                          "http://localhost:8000" + store.store_address.image
                        }
                        alt="hyy"
                      />
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-12 pb-5">
                        <h2>{store.store_address.store_name}</h2>
                        <p>{store.store_address.street_one}</p>
                        <p>{store.store_address.street_two}</p>
                        <p>
                          {store.store_address.city},{" "}
                          {store.store_address.state}
                        </p>
                        <p>
                          {store.store_address.country},{" "}
                          {store.store_address.zip_code}
                        </p>
                        <p>{store.store_address.landmark}</p>
                        <p>
                          {store.store_address.phone},{" "}
                          {store.store_address.alternate_phone}
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-6">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(store.store_id)}
                            >
                              Delete
                            </button>
                          </div>
                          <div className="col-lg-6">
                            <Link
                              className="btn btn-outline-primary"
                              to={`/seller/edit-address/${store.store_address.id}`}
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
        ))}
      </div>
    </>
  );
};

export default PickupStore;
