import axios from "axios";
import React from "react";

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
        {Object.keys(props.data.details.key_features).map((key) => {
          return (
            <div className="col-lg-4 mt-2 mb-2" key={key}>
              <label className="d-inline">{key}</label>
              <input
                type="text"
                className="form-control"
                value={props.data.details.key_features[key]}
                onChange={(e) => handleChangeFeatures(key, e.target.value)}
                required
              />
            </div>
          );
        })}
      </div>
      <div className="row">
        {Object.keys(props.data.details.all_details).map((key) => {
          return (
            <div className="col-lg-4" key={key}>
              <label className="d-inline">{key}</label>
              <input
                type="text"
                className="form-control"
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
