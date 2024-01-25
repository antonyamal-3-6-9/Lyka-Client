import React, { useEffect, useState } from "react";
import {
  Modal,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  styled,
  InputLabel,
  IconButton,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import axios, { all } from "axios";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AdminEditMain = ({
  openMain,
  setOpenMain,
  category,
  setCategory,
  BASE_URL,
  setLoading,
  main,
}) => {
  const [newMainData, setNewMainData] = useState({
    rootId: "",
    name: "",
  });

  const fetchDetails = async () => {

    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const detailsResponse = await axios.get(
        `${BASE_URL}lyka-admin/main/details/retrieve/${main.mainId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(detailsResponse.data);
      setKeyFeatures(detailsResponse.data.key_features);
      setAllDetails(detailsResponse.data.all_details);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert("couldn't find details");
    }
  };

  useEffect(() => {
    setNewMainData({ ...newMainData, rootId: main.rootId, name: main.name });
    fetchDetails();
  }, []);

  const [isInputChanged, setIsInputChanged] = useState(false);
  const [isRootChanged, setIsRootChanged] = useState(false);
  const [isfeaturesChanged, setIsFeaturesChanged] = useState(false);
  const [isDetailsChanged, setIsDetailsChanged] = useState(false);

  const [tempFeature, setTempFeature] = useState("");
  const [tempDetail, setTempDetail] = useState("");

  const [keyFeatures, setKeyFeatures] = useState({});
  const [allDetails, setAllDetails] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setIsInputChanged(true);
    } else {
      setIsRootChanged(true);
    }
    setNewMainData({ ...newMainData, [e.target.name]: e.target.value });
  };

  const handleTempFeatureChange = (e) => {
    setTempFeature(e.target.value);
  };

  const handleTempDetailChange = (e) => {
    setTempDetail(e.target.value);
  };

  const handleFeatureAdd = () => {
    if (!isfeaturesChanged) {
      setIsFeaturesChanged(true);
    }
    setKeyFeatures({ ...keyFeatures, [tempFeature]: null });
  };

  const handleDetailAdd = () => {
    if (!isDetailsChanged) {
      setIsDetailsChanged(true);
    }
    setAllDetails({ ...allDetails, [tempDetail]: null });
  };

  const handleClose = () => {
    setOpenMain(false);
  };

  const handleremoveFeature = (feature) => {
    if (!isfeaturesChanged) {
      setIsFeaturesChanged(true);
    }
    let tempObj = { ...keyFeatures };
    delete tempObj[feature];
    console.log(tempObj);
    setKeyFeatures({ ...tempObj });
  };

  const handleremoveDetail = (detail) => {
    if (!isDetailsChanged) {
      setIsDetailsChanged(true);
    }
    let tempObj = { ...allDetails };
    delete tempObj[detail];
    console.log(tempObj);
    setAllDetails(tempObj);
  };

  const handleDetailsSubmit = async (mainId) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      console.log(allDetails)
      const detailsResponse = await axios.post(
        `${BASE_URL}lyka-admin/main/details/add/`,
        {
          mainId: mainId,
          keyFeatures: keyFeatures,
          allDetails: allDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setOpenMain(false);
    } catch (error) {
      setLoading(false);
      alert("error");
    }
  };

  const handleSubmit = async () => {
    if (!isInputChanged && !isRootChanged) {
      if (isfeaturesChanged || isDetailsChanged) {
        handleDetailsSubmit(main.mainId);
        handleClose()
        return;
      }
      alert("no changes has been made");
      return;
    }

    if (newMainData.rootId.length < 5) {
      alert("A root category corresponding to main is required");
      return;
    }

    if (newMainData.name.length < 5) {
      alert("Name must contain at least five characters");
      return;
    }

    if (Object.keys(keyFeatures).length < 5) {
      alert("at least five key features is required");
      return;
    }

    if (Object.keys(allDetails).length < 5) {
      alert("at least five additional details is required");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const mainResponse = await axios.patch(
        `${BASE_URL}lyka-admin/main/update/`,
        {
          main_id: main.mainId,
          name: isInputChanged ? newMainData.name : main.name,
          root_id: isRootChanged ? newMainData.rootId : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempMain = [...category.main];
      const id = main.mainId
      tempMain = tempMain.map((main) => {
        console.log(main)
        if (main.main_id === id) {
        
          if (isRootChanged) {
            main.name = newMainData.name;
            main.root = newMainData.rootId;
          } else {
            main.name = newMainData.name;
          }
        }
        return main;
      });
      setCategory({ ...category, main: tempMain });
      handleDetailsSubmit(main.mainId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("error adding main category");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "scroll",
  };

  return (
    <>
      <Modal open={openMain} onClose={handleClose}>
        <Page style={style}>
          <div className="row mb-4">
            <div className="col-lg-4">
              <TextField
                label="Select Root"
                value={isRootChanged ? newMainData.rootId : main.rootId}
                name="rootId"
                onChange={handleChange}
                fullWidth
                required
                select
              >
                {category.root.map((root) => (
                  <MenuItem value={root.root_id}>{root.name}</MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-lg-4">
              <TextField
                name="name"
                value={isInputChanged ? newMainData.name : main.name}
                onChange={handleChange}
                label="Name"
                autoComplete="name"
                autoFocus="name"
                fullWidth
                required
             
              />
            </div>
          </div>
          <Divider orientation="horizontal" />
            <div className="mt-2">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex justify-content-evenly mb-3">
                    <TextField
                      name="tempFeature"
                      value={tempFeature}
                      label="Enter the Key"
                      autoComplete="tempFeature"
                      autoFocus="tempFeature"
                      required
                      onChange={handleTempFeatureChange}
                    />
                    <Button
                      onClick={handleFeatureAdd}
                      variant="outlined"
                      sx={{ borderColor: "#294B29", color: "#294B29" }}
                    >
                      Add
                    </Button>
                  </div>
                  <Divider />
                  <div className="d-flex flex-wrap justify-content-evenly mt-2">
                    {Object.keys(keyFeatures).map((key, index) => (
                      <div
                        style={{ border: "1px solid #E1F0DA" }}
                        className="p-2 mb-2"
                      >
                        <IconButton
                          onClick={() => {
                            handleremoveFeature(key);
                          }}
                        >
                          <CloseIcon
                            style={{
                              fontSize: "1rem",
                              margin: "0",
                              padding: "0",
                              color: "#A94438",
                            }}
                          />
                        </IconButton>
                        <p key={index} className="text-dark m-0 p-0">
                          {key}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="col-lg-6"
                  style={{ borderLeft: "1px solid #E1F0DA" }}
                >
                  <div className="d-flex justify-content-evenly mb-3">
                    <TextField
                      name="tempDetail"
                      value={tempDetail}
                      label="Enter the Key"
                      autoComplete="tempDetail"
                      autoFocus="tempDetail"
                      required
                      onChange={handleTempDetailChange}
                    />
                    <Button
                      onClick={handleDetailAdd}
                      variant="outlined"
                      sx={{ borderColor: "#294B29", color: "#294B29" }}
                    >
                      Add
                    </Button>
                  </div>
                  <Divider />
                  <div
                    className="d-flex flex-wrap justify-content-evenly mt-2"
                    style={{ width: "90%" }}
                  >
                    {Object.keys(allDetails).map((detail, index) => (
                      <div
                        style={{ border: "1px solid #E1F0DA" }}
                        className="p-2 mb-2"
                      >
                        <IconButton
                          onClick={() => {
                            handleremoveDetail(detail);
                          }}
                        >
                          <CloseIcon
                            style={{
                              fontSize: "1rem",
                              margin: "0",
                              padding: "0",
                              color: "#A94438"
                            }}
                          />
                        </IconButton>
                        <p key={index} className="text-dark m-0 p-0">
                            {detail}
                          </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#294B29",
                height: "40px",
                marginRight: "30px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Page>
      </Modal>
    </>
  );
};

export default AdminEditMain;
