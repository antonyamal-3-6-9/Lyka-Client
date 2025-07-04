import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function CategoryActionModal({open, setOpen, initiateDeletion, x}) {

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
        initiateDeletion(x.x, x.id)
        setOpen(false)
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
            Are you sure ?
          </Typography>
            <div className='d-flex justify-content-evenly align-items-center'>
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