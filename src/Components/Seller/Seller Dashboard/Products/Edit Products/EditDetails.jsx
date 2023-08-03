import React from "react";

const EditDetails = (props) => {
  const handleChangeFeatures = (key, value) => {
    props.setNewFeatures({ ...props.newFeatures, [key]: value });
  };

  const handleChangeDetails = (key, value) => {
    props.setNewAllDetails({ ...props.newAllDetails, [key]: value });
  };

  return (
    <>
      <div className="row">
        {Object.keys(props.newFeatures).map((key) => {
          <div className="col-lg-6 mt-2 mb-2" key={key}>
            <label className="d-inline">{key}</label>
            <input
              type="text"
              className="form-control"
              value={props.newFeatures[key]}
              onChange={(e) => handleChangeFeatures(key, e.target.value)}
            />
          </div>;
        })}
      </div>
      <div className="row">
        {Object.keys(props.newAllDetails).map((key) => {
          return (
            <div className="col-lg-6" key={key}>
              <label className="d-inline">{key}</label>
              <input
                type="text"
                className="form-control"
                value={props.newAllDetails[key]}
                onChange={(e) => handleChangeDetails(key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EditDetails;
