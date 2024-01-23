import React, { useState } from "react";
import { Button, TextField, Paper, styled, Modal } from "@mui/material";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AddRootCategory = ({ openRoot, setOpenRoot }) => {
  const [root, setRoot] = useState("");

  const handleChange = (e) => {
    setRoot(e.target.value);
  };

  const handleClose = () => {
    setOpenRoot(false);
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
      <Modal open={openRoot} onClose={handleClose}>
        <Page sx={style}>
          <h5 className="text-center text-dark h5">Root Category</h5>
          <p>
            A "Root Category" is the top-level boss category that groups
            everything together. Like "Electronics" includes all kinds of
            electronic things
          </p>
          <TextField
            fullWidth
            name="root"
            value={root}
            autoComplete="root"
            autoFocus="root"
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

export default AddRootCategory;
