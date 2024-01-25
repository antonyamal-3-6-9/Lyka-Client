import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  styled,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AdminEditSub = ({
  openSub,
  setOpenSub,
  category,
  setCategory,
  BASE_URL,
  setLoading,
  sub,
}) => {
  const [newSubData, setNewSubData] = useState({
    name: "",
    main: "",
  });

  useEffect(() => {
    setNewSubData({...newSubData, name: sub.name, main: sub.mainId})
  }, [])

  const [isInputChanged, setIsInputChanged] = useState(false);
  const [isMainChanged, setIsMainChanged] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setIsInputChanged(true);
    } else {
      setIsMainChanged(true);
    }
    setNewSubData({ ...newSubData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpenSub(false);
  };

  const handleSubmit = async () => {
    if (!isInputChanged && !isMainChanged) {
      alert("something has to be changed");
      return;
    }

    if (newSubData.main.length < 5) {
      alert("main id must be at least five characters");
      return;
    }

    if (newSubData.name.length < 5) {
      alert("name must be at least five characters");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const subResponse = await axios.patch(
        `${BASE_URL}lyka-admin/sub/update/`,
        {
          sub_id: sub.subId,
          name: isInputChanged ? newSubData.name : sub.name,
          main_id: isMainChanged ? newSubData.main : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempSub = [...category.sub];
      const id = sub.subId
      tempSub = tempSub.map((sub) => {
        if (sub.sub_id === id) {
          if (isMainChanged) {
            sub.name = newSubData.name;
            sub.main = newSubData.main;
          } else {
            sub.name = newSubData.name;
          }
        }
        return sub;
      });
      setCategory({ ...category, sub: [...tempSub] });
      setLoading(false);
      setOpenSub(false);
    } catch (error) {
      setOpenSub(false);
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
      <Modal open={openSub} onClose={handleClose}>
        <Page sx={style}>
          <h5 className="text-center text-dark h5">Sub Category</h5>
          <p>A Sub Category is the third level of category.</p>
          <TextField
            label="Select Main"
            value={isMainChanged ? newSubData.main : sub.mainId}
            name="main"
            select
            variant="standard"
            onChange={handleChange}
          >
            {category.main.map((main) => (
              <MenuItem value={main.main_id}>{main.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            name="name"
            value={isInputChanged ? newSubData.name : sub.name}
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
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Page>
      </Modal>
    </>
  );
};

export default AdminEditSub;
