import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function VarColAddModal({open, setOpen, x, initiateVAdd, initiateCAdd, setX }) {

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {

    if (x.xData.length <= 3){
        alert('must be greater than three')
        return;
    }

    if (x.x === "Variant"){
        initiateVAdd(x.productId, x.productIndex, x.xData)
    } else if (x.x === "Color"){
        initiateCAdd(x.productId, x.productIndex, x.xData)
    }
  }

  const handleChange = (e) => {
    setX({...x, xData: e.target.value})
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter new {x.x}
          </Typography>
          <TextField
            variant='standard'
            fullWidth
            value={x.xData}
            name='xData'
            onChange={handleChange}
            label={x.x}
          />
            <div className='d-flex justify-content-evenly align-items-center mt-3'>
                <Button variant='contained' style={{backgroundColor: "#294B29"}} onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button variant='contained' style={{backgroundColor: "#789461"}} onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}