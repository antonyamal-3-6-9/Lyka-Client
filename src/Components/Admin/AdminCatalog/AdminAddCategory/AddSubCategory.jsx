import React, { useState } from "react";
import { Button, TextField, Paper, styled, Modal, InputLabel, Select, MenuItem } from "@mui/material"

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AddSubCategory = ({ openSub, setOpenSub, category, setCategory, BASE_URL, setLoading}) => {

  const [subData, setSubData] = useState({
    name: "",
    main: ""
  })

  const handleChange = (e) => {
    setSubData({...subData, [e.target.name]: e.target.value});
  };

  const handleClose = () => {
    setOpenSub(false);
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "scroll",
  };

  return (
    <>
      <Modal open={openSub} onClose={handleClose}>
        <Page sx={style}>
          <h5 className="text-center text-dark h5">Root Category</h5>
          <p>
            A Sub Category is the third level of category.
          </p>
          <InputLabel>Select Root</InputLabel>
              <Select
                label="Select Main"
                value={subData.main}
                name="main"
                onChange={handleChange}
              >
                {category.main.map((main) => (
                  <MenuItem value={main.main_id}>{main.name}</MenuItem>
                ))}
              </Select>
          <TextField
            fullWidth
            name="name"
            value={subData.name}
            autoComplete="name"
            autoFocus="name"
            onChange={handleChange}
            margin="normal"
            label="Enter the Name"
          />
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#294B29" }}
          >
            Add
          </Button>
        </Page>
      </Modal>
    </>
  );
};

export default AddSubCategory;
