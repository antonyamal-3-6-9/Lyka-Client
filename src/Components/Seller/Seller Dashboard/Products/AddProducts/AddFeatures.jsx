import axios from "axios";
import React from "react";
import { TextField } from "@mui/material";

const AddFeatures = (props) => {
  const [features, setFeatures] = React.useState({});
  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    const payload = {
      params: {
        main: props.main_id,
      },
    };
    axios
      .get(props.url + "get-details/", payload)
      .then((response) => {
        setFeatures(response.data.key_features);
        setDetails(response.data.all_details);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeFeatures = (key, value) => {
    props.setData({
      ...props.data,
      details: {
        ...props.data.details,
        key_features: {
          ...props.data.details.key_features,
          [key]: value,
        },
      },
    });
  };

  const handleChangeDetails = (key, value) => {
    props.setData({
      ...props.data,
      details: {
        ...props.data.details,
        all_details: {
          ...props.data.details.all_details,
          [key]: value,
        },
      },
    });
  };

  return (
    <>
      <div className="row">
      <h6 className="h6 text-dark text-center">Key Features</h6>
        {Object.keys(props.data.details.key_features).map((key) => {
          return (
            <div className="col-lg-2 mt-2 mb-2" key={key}>
              <TextField
                type="text"
                value={props.data.details.key_features[key]}
                onChange={(e) => handleChangeFeatures(key, e.target.value)}
                required
                label={key}
                fullWidth
                variant="standard"
              />
            </div>
          );
        })}
<h6 className="h6 text-dark text-center">Specifications</h6>
        {Object.keys(props.data.details.all_details).map((key) => {
          return (
            <div className="col-lg-2" key={key}>
              <TextField
                type="text"
                fullWidth
                label={key}
                variant="standard"
                value={props.data.details.all_details[key]}
                onChange={(e) => handleChangeDetails(key, e.target.value)}
                required
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddFeatures;
