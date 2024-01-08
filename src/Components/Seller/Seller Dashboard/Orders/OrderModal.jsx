import React from 'react'
import Modal from "react-modal";
import { Button } from '@mui/material';

const OrderModal = ({handleSubmit, isOrderAction, handleActionCancel, orderIdForAction, isAccept}) => {
    return (
        <Modal
        isOpen={isOrderAction}
        onRequestClose={handleActionCancel}
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
        <h2 style={{ marginBottom: "10px" }}>Confirmation</h2>
        <p style={{ marginBottom: "20px" }}>
          {isAccept
            ? "Are you sure to confirm the order"
            : "Are you sure to cancel the order"}
        </p>
        <Button
          variant="text"
          onClick={() => handleSubmit(orderIdForAction)}
        >
          Confirm
        </Button>
        <Button variant="text" onClick={handleActionCancel}>Cancel</Button>
      </Modal>
    )
}

export default OrderModal