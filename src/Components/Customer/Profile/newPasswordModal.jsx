import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";

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

export default function NewPasswordModal({
  hasPassword,
  setIsUpdatePassword,
  BASE_URL,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  const [alertEnable, setAlertEnable] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [alertSeverity, setAlertSeverity] = useState(null)

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const checkPassword = () => {
    if (passwordData.new_password === passwordData.new_password2) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {

    if (hasPassword){
      if (passwordData.old_password.length <= 0){
        setAlertData("Existing Password cannot be empty.")
        setAlertEnable(true)
        setAlertSeverity("warning")
        return;
      }
    }

    if (passwordData.new_password.length <= 0){
      setAlertData("New Password Cannot be empty.")
      setAlertEnable(true)
      setAlertSeverity("warning")
      return;
    }

    if (!checkPassword) {
      setAlertData("Passwords are not matching.")
      setAlertEnable(true)
      setAlertSeverity("warning")
      return;
    }

    e.preventDefault();


    try {
      const passwordChangeResponse = await axios.patch(
        `${BASE_URL}set-password/`,
        {
          password: passwordData.old_password,
          new_password: passwordData.new_password,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (passwordChangeResponse.status === 200) {
        setIsUpdatePassword(false);
        console.log("Password has been successfully update");
      }
    } catch (error) {
      setAlertEnable(true)
      setAlertData(error.response.data.message)
      setAlertSeverity("error")
    }
  };

  return (
    <div>
      <FloatingAlert
        enable={alertEnable}
        message={alertData}
        severity={alertSeverity}
        setEnable={setAlertEnable}
      />
      <Button onClick={handleOpen}>Change Password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {hasPassword && (
            <Box>
              <Typography variant="h6" component="h2">
                Existing Password
              </Typography>
              <TextField
                label="Existing Password"
                fullWidth
                type="password"
                margin="normal"
                name="old_password"
                value={passwordData.old_password}
                onChange={handleChange}
              />
            </Box>
          )}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Passwords
          </Typography>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            name="new_password"
            value={passwordData.new_password}
            onChange={handleChange}
          />
          <TextField
            label="Repeat New Password"
            type="password"
            fullWidth
            margin="normal"
            name="new_password2"
            value={passwordData.new_password2}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
