import React, { useState } from "react";

const EditBasicDetails = (props) => {
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      props.setNewDetails({ ...props.newDetails, thumbnail: file });
    } else {
      props.setNewDetails({
        ...props.newDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <div>
        <div className="col-lg-12 mt-3 mb-3">
          <div className="row">
            <div className="col-lg-6">
              <label>Brand</label>
              <input
                type="text"
                class="form-control"
                placeholder="Eg: Apple, Samsung"
                name="brand"
                value={isChanged ? props.newDetails.brand : props.details.brand}
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="col-lg-6">
              <label className="d-inline">Model Name</label>

              <input
                type="text"
                class="form-control"
                placeholder="Eg: Iphone 14, Galaxy S23"
                name="name"
                value={isChanged ? props.newDetails.name : props.details.name}
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 mb-3">
          <div className="row">
            <div className="col-lg-4">
              <label>Launch Date</label>
              <input
                type="date"
                class="form-control"
                placeholder="Date"
                name="launch_date"
                value={
                  isChanged
                    ? props.newDetails.launch_date
                    : props.details.launch_date
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="col-lg-4">
              <label>Stock</label>

              <input
                type="number"
                class="form-control"
                placeholder="Eg: 10"
                name="stock"
                value={isChanged ? props.newDetails.stock : props.details.stock}
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="col-lg-4">
              <label>Weight(in gram)</label>
              <input
                type="number"
                class="form-control"
                placeholder="Eg: 200"
                name="weight"
                value={
                  isChanged ? props.newDetails.weight : props.details.weight
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <label>Original Price</label>
              <input
                type="number"
                class="form-control"
                placeholder="Eg: 15000"
                name="original_price"
                value={
                  isChanged
                    ? props.newDetails.original_price
                    : props.details.original_price
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="col-lg-4">
              <label>Selling Price</label>
              <input
                type="number"
                class="form-control"
                placeholder="Eg: 18000"
                name="selling_price"
                value={
                  isChanged
                    ? props.newDetails.selling_price
                    : props.details.selling_price
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="col-lg-4">
              <label>Offer Price</label>
              <input
                type="number"
                class="form-control"
                placeholder="Eg: 17000"
                name="offer_price"
                value={
                  isChanged
                    ? props.newDetails.offer_price
                    : props.details.offer_price
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 mb-3">
          <div className="row">
            <div className="col-lg-12">
              <label>ThumbNail</label>
              <br />
              {props.newDetails.thumbnail ? (
                <img
                  src={URL.createObjectURL(props.newDetails.thumbnail)}
                  alt="New Thumbnail"
                  width="100"
                  height="150"
                  className="mb-2"
                />
              ) : props.details.thumbnail ? (
                <img
                  src={"http://localhost:8000" + props.details.thumbnail}
                  alt="Existing Thumbnail"
                  width="100"
                  height="150"
                  className="mb-2"
                />
              ) : null}
              <input
                type="file"
                className="form-control"
                name="thumbnail"
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label>Variant</label>
              <input
                type="text"
                className="form-control"
                name="variant"
                value={
                  isChanged ? props.newDetails.variant : props.details.variant
                }
                onChange={(e) => {
                  handleChange(e);
                  setIsChanged(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 mb-3">
          <label>Description</label>
          <textarea
            class="form-control"
            name="description"
            value={
              isChanged
                ? props.newDetails.description
                : props.details.description
            }
            onChange={(e) => {
              handleChange(e);
              setIsChanged(true);
            }}
            rows="3"
            cols="108"
          />
        </div>
      </div>
    </>
  );
};

export default EditBasicDetails;
