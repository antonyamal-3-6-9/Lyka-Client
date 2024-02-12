import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

export default function CouponChargeActionModal({open, setOpen, x, initiateCouponDeletion, initiateChargeDeletion}) {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    if (x.x === "coupon"){
      initiateCouponDeletion(x.id, x.index);
    } else if(x.x === "charge"){
      initiateChargeDeletion(x.id, x.index);
    }
  }

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure ?
            </Typography>
            <div className="d-flex justify-content-evenly align-items-center">
              <Button
                variant="contained"
                style={{ backgroundColor: "#294B29" }}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#789461" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
