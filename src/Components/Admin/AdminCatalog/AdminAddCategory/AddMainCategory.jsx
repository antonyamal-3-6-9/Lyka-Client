import React, { useState } from "react";
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

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AddMainCategory = ({ openMain, setOpenMain, category, setCategory, BASE_URL, setLoading }) => {
  const [mainData, setMainData] = useState({
    rootId: "",
    name: "",
  });

  const [isAdded, setIsAdded] = useState(false);

  const handleAddMain = () => {
    if (mainData.name.length < 0 || mainData.name.length > 20) {
      alert("error");
      return;
    }
    if (mainData.rootId.length === 0) {
      alert("id cannot be empty");
      return;
    }
    setIsAdded(true);
  };

  const [tempFeature, setTempFeature] = useState("");
  const [tempDetail, setTempDetail] = useState("");

  const [keyFeatures, setKeyFeatures] = useState({});
  const [allDetails, setAllDetails] = useState({});

  const handleChange = (e) => {
    setMainData({ ...mainData, [e.target.name]: e.target.value });
  };

  const handleTempFeatureChange = (e) => {
    setTempFeature(e.target.value);
  };

  const handleTempDetailChange = (e) => {
    setTempDetail(e.target.value);
  };

  const handleFeatureAdd = () => {
    setKeyFeatures({ ...keyFeatures, [tempFeature]: null });
  };

  const handleDetailAdd = () => {
    setAllDetails({ ...allDetails, [tempDetail]: null });
  };

  const handleClose = () => {
    setOpenMain(false);
  };

  const handleremoveFeature = (feature) => {
    let tempObj = { ...keyFeatures };
    delete tempObj[feature];
    console.log(tempObj);
    setKeyFeatures({ ...tempObj });
  };

  const handleremoveDetail = (detail) => {
    let tempObj = { ...allDetails };
    delete tempObj[detail];
    console.log(tempObj);
    setAllDetails({ ...tempObj });
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
              <InputLabel>Select Root</InputLabel>
              <Select
                label="Select Root"
                value={mainData.rootId}
                name="rootId"
                onChange={handleChange}
                fullWidth
                readOnly={isAdded}
              >
                {category.root.map((root) => (
                  <MenuItem value={root.root_id}>{root.name}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="col-lg-4">
              <TextField
                name="name"
                value={mainData.name}
                onChange={handleChange}
                label="Name"
                autoComplete="name"
                autoFocus="name"
                fullWidth
                readOnly={isAdded}
                sx={{ mt: 3 }}
              />
            </div>
            <div className="col-lg-4">
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#294B29", mt: 4 }}
                onClick={handleAddMain}
                disabled={isAdded}
              >
                Add
              </Button>
            </div>
          </div>
          <Divider orientation="horizontal" />
          {isAdded && (
            <div className="mt-2">
              <h5 className="text-dark h5">
                Inorder to complete adding a main category, define common specs
                keys for that category. For instance, for "Mobiles," specify
                processor, display, and RAM. Organize eye-catching keys on the
                left and less relevant ones on the right for easy product
                addition.
              </h5>
              <div className="d-flex justify-content-between">
              <h6 className="h6 text-dark mb-5">
                NB: This is required for adding specs and features to new
                products.
              </h6>
              <Button variant="contained" sx={{bgcolor: "#294B29", height: "40px", marginRight: "30px"}} size="small">Submit</Button>
              </div>

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
                            }}
                          />
                          <p key={index} className="text-dark m-0 p-0">
                            {detail}
                          </p>
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Page>
      </Modal>
    </>
  );
};

export default AddMainCategory;
