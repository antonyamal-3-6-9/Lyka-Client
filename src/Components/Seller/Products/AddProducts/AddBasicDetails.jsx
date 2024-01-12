import React, { useState } from "react";

const AddBasicDetails = (props) => {
  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      props.setDetails({ ...props.details, thumbnail: file });
    } else {
      props.setDetails({ ...props.details, [e.target.name]: e.target.value });
    }
  };

  function isValidHexColor(color) {
    const hexColorPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorPattern.test(color);
  }

  const handleColorsChange = (e) => {
    const inputValue = document.getElementById("color").value
    if (inputValue !== "") {
      props.setDetails({
        ...props.details,
        colors: [...props.details.colors, inputValue],
      });
      console.log(props.details.colors);
      document.getElementById("color").value = "";
    }
  };

  const handleVariationChange = () => {
    const inputValue = document.getElementById("variant").value
    if (inputValue !== "") {
      props.setDetails({
        ...props.details,
        variations: [...props.details.variations, inputValue],
      });
      document.getElementById("variant").value = "";
    }
  };

  const handleColorRemove = (index) => {
    const newColor = [...props.details.colors];
    newColor.splice(index, 1);
    props.setDetails({ ...props.details, colors: newColor });
  };

  const handleVariantRemove = (index) => {
    const newVariations = [...props.details.variations];
    newVariations.splice(index, 1);
    props.setDetails({ ...props.details, variantions: newVariations });
  };

  return (
    <>
      <div className="col-lg-12 mt-3 mb-3">
        <div className="row">
          <div className="col-lg-4">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Eg: Apple, Samsung"
              name="brand"
              value={props.details.brand}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" id="brand-feedback">
              Please enter the brand.
            </div>
          </div>
          <div className="col-lg-4">
            <label htmlFor="model-name" className="d-inline">
              Model Name
            </label>
            <input
              type="text"
              className="form-control"
              id="model-name"
              placeholder="Eg: Iphone 14, Galaxy S23"
              name="name"
              value={props.details.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" id="name-feedback">
              Please enter the model name.
            </div>
          </div>
          <div className="col-lg-4">
            <label htmlFor="launch-date">Launch Date</label>
            <input
              type="date"
              className="form-control"
              id="launch-date"
              placeholder="Date"
              name="launch_date"
              value={props.details.launch_date}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" id="launch-date-feedback">
              Please enter the launch date.
            </div>
          </div>
          <div className="col-lg-4 mt-3 mb-3">
            <label htmlFor="weight">Weight(in gram)</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              placeholder="Eg: 200"
              name="weight"
              value={props.details.weight}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" id="weight-feedback">
              Please enter the weight.
            </div>
          </div>
          <div className="col-lg-6 mt-3 mb-3">
            <label htmlFor="thumbnail">ThumbNail</label>
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              name="thumbnail"
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback" id="thumbnail-feedback">
              Please select a thumbnail.
            </div>
          </div>
          <div className="col-lg-12 mt-3 mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={props.details.description}
              onChange={handleChange}
              rows="3"
              cols="108"
              required
            ></textarea>
            <div className="invalid-feedback" id="description-feedback">
              Please enter the description.
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              {props.details.colors.map((item, index) => (
                <div>
                  <h6>{item}</h6>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => handleColorRemove(index)}
                  >
                    Remove Color
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-12 mt-3 mb-3">
            <div className="row">
              <div className="col-lg-8">
                <label>Color</label>
                <input className="form-control" name="color" id="color" />
              </div>
              <div className="col-lg-4">
                <button
                  type="button"
                  onClick={handleColorsChange}
                  className="btn btn-outline-info"
                >
                  Add Color
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              {props.details.variations.map((item, index) => (
                <div>
                  <h6>{item}</h6>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => handleColorRemove(index)}
                  >
                    Remove Variant
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-12 mt-3 mb-3">
            <div className="row">
              <div className="col-lg-8">
                <label>Variant</label>
                <input className="form-control" name="variant" id="variant" />
              </div>
              <div className="col-lg-4">
                <button
                  className="btn btn-outline-info"
                  onClick={handleVariationChange}
                  type="button"
                >
                  Add Variant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBasicDetails;
