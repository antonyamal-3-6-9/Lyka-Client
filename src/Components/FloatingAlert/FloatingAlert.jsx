import React, { useState } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const FloatingAlert = ({ severity, message, enable, setEnable }) => {

  const handleClose = () => {
    setEnable(false);
  };

  return (
    <Snackbar open={enable} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default FloatingAlert;
