import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@mui/material";

const AddProductNav = ({toAdmin}) => {
  Modal.setAppElement("#root");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    if (toAdmin){
      navigate("/admin/catalog/")
    } else {
    navigate("/seller/products");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Modal
        isOpen={showConfirmation}
        onRequestClose={handleCancelDelete}
        style={{
          content: {
            width: "400px",
            height: "400px",
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
        <h2 style={{ marginBottom: "10px" }}>Confirm Cancel</h2>
        <p style={{ marginBottom: "20px" }}>
          Are you sure want to cancel now? Product will not be saved unless you
          make the final confirmation
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: "10px" }} onClick={handleConfirm}>
            Yes
          </Button>
          <Button onClick={handleCancelDelete}>No</Button>
        </div>
      </Modal>

      <div className="d-flex">
        <Button style={{ color: "#3E3232" }} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddProductNav;
