import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, styled, Modal } from "@mui/material";
import axios from "axios";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AdminEditRoot = ({
  openRoot,
  setOpenRoot,
  setLoading,
  BASE_URL,
  category,
  setCategory,
  root,
  rootId,
}) => {
  const [newRoot, setNewRoot] = useState("");
  const [isInputChanged, setIsInputChanged] = useState(false);

  useEffect(() => {
    setNewRoot(root)
  }, [])

  const handleChange = (e) => {
    setIsInputChanged(true);
    setNewRoot(e.target.value);
  };

  const handleClose = () => {
    setOpenRoot(false);
  };

  const handleSubmit = async () => {
    if (!isInputChanged) {
      return;
    }

    if (newRoot.length <= 5) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}lyka-admin/root/update/`,
        {
          name: newRoot,
          root_id: rootId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempRoot = [...category.root];
      tempRoot = tempRoot.map((root) => {
        if (root.root_id === rootId) {
          root.name = newRoot;
        }
        return root;
      });

      setCategory({ ...category, root: [...tempRoot] });
      setOpenRoot(false);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
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
            name={isInputChanged ? "newRoot" : "root"}
            value={isInputChanged ? newRoot : root}
            autoComplete={isInputChanged ? "newRoot" : "root"}
            autoFocus={isInputChanged ? "newRoot" : "root"}
            onChange={handleChange}
            margin="normal"
            label="Enter the Name"
          />
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#294B29" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Page>
      </Modal>
    </>
  );
};

export default AdminEditRoot;
