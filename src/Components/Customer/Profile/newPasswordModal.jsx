import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';



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

export default function NewPasswordModal({hasPassword,  setIsUpdatePassword, BASE_URL}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

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
    e.preventDefault();
    if (!checkPassword) {
      console.log("Passwords are not matching");
      return;
    }
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
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Passwords
          </Typography>
          <TextField
            label="Password 1"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password 2"
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="password3"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button onClick={}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
