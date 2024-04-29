import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropDown({initiateSort}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color: "#16213E" }}
      >
        Sort
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {initiateSort("oldest");handleClose();}} >Oldest</MenuItem>
        <MenuItem onClick={() => {initiateSort("alphabetical");handleClose();}}>Alphabetical</MenuItem>
        <MenuItem onClick={() => {initiateSort("priceL");handleClose();}}>Price low to high</MenuItem>
        <MenuItem onClick={() => {initiateSort("priceH");handleClose();}}>Price high to low</MenuItem>
      </Menu>
    </div>
  );
}