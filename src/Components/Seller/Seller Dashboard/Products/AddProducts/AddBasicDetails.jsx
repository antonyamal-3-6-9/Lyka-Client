import { Button, Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddBasicDetails = (props) => {
  const [colorAdded, setColorAdded] = useState(false);
  const [variantAdded, setVariantAdded] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      props.setDetails({ ...props.details, thumbnail: file });
    } else {
      props.setDetails({ ...props.details, [e.target.name]: e.target.value });
    }
  };

  const handleColorsChange = (e) => {
    setColorAdded(true);
    const inputValue = document.getElementById("color").value;
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
    setVariantAdded(true);
    const inputValue = document.getElementById("variant").value;
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
    props.setDetails({ ...props.details, variations: newVariations });
  };

  const handleConfirm = () => {
    const inputs = document.getElementById('basic-container').querySelectorAll('input:not(#color):not(#variant)');
  
    for (const input of inputs) {
      if (input.value.trim() === '') {
  
        console.log('There are inputs left to fill.');
        return;
      }
    }

    console.log('All inputs are filled.');
    props.setBasicAdded(true);
  };
  

  return (
    <>
      <div className="row mt-5 mb-5" id="basic-container">
        <div className="col-lg-2">
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
        <div className="col-lg-3">
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
        <div className="col-lg-2">
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
        <div className="col-lg-2">
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
        <div className="col-lg-3">
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
          {colorAdded && (
            <h6 className="text-dark text-center">Added Colors</h6>
          )}
          <div className="d-flex justify-content-evenly">
            {props.details.colors.map((item, index) => (
              <div>
                <IconButton onClick={() => handleColorRemove(index)}>
                  <CloseIcon
                    style={{
                      fontSize: "1rem",
                      margin: "0",
                      padding: "0",
                      color: "red",
                    }}
                  />
                </IconButton>
                <span className="text-dark h6">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-12">
          {variantAdded && (
            <h6 className="text-dark text-center">Added Variants</h6>
          )}
          <div className="d-flex justify-content-evenly">
            {props.details.variations.map((item, index) => (
              <div>
                <IconButton
                  type="button"
                  style={{ color: "red" }}
                  size="small"
                  onClick={() => handleVariantRemove(index)}
                >
                  <CloseIcon
                    style={{
                      fontSize: "1rem",
                      margin: "0",
                      padding: "0",
                      color: "red",
                    }}
                  />
                </IconButton>
                <span className="text-dark h6">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="d-flex align-items-center justify-content-evenly">
            <div>
              <label>Color</label>
              <input className="form-control" name="color" id="color" />
            </div>
            <div>
              <Button
                type="button"
                onClick={handleColorsChange}
                style={{ color: "#3E3232" }}
              >
                Add Color
              </Button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="d-flex align-items-center justify-content-evenly">
            <div>
              <label>Variant</label>
              <input className="form-control" name="variant" id="variant" />
            </div>
            <div>
              <Button
                style={{ color: "#3E3232" }}
                onClick={handleVariationChange}
                type="button"
              >
                Add Variant
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex justify-content-center">
          <Button variant="outlined" type="button" onClick={handleConfirm}>
            Confirm Primary
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBasicDetails;
