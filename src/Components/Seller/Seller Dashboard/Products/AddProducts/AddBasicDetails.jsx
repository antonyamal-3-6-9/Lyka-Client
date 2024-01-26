import {
  Button,
  Icon,
  IconButton,
  TextField,
  TextArea,
  InputLabel,
  Divider,
} from "@mui/material";
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
    const inputs = document
      .getElementById("basic-container")
      .querySelectorAll("input:not(#color):not(#variant)");

    for (const input of inputs) {
      if (input.value.trim() === "") {
        console.log("There are inputs left to fill.");
        return;
      }
    }

    if (props.details.colors.length <= 0) {
      alert("At least one color is needed");
      return;
    }

    if (props.details.variations.length <= 0) {
      alert("At least one variant is needed");
      return;
    }

    console.log("All inputs are filled.");
    props.setBasicAdded(true);
  };

  return (
    <>
      <div className="row mt-5 mb-5" id="basic-container">
        <div className="col-lg-2">
          <TextField
            type="text"
            id="brand"
            fullWidth
            variant="standard"
            placeholder="Apple, Samsung, ..."
            name="brand"
            value={props.details.brand}
            onChange={handleChange}
            required
            label="Brand"
            disabled={props.basicAdded}
          />
          <div className="invalid-feedback" id="brand-feedback">
            Please enter the brand.
          </div>
        </div>
        <div className="col-lg-2">
          <TextField
            type="text"
            variant="standard"
            id="model-name"
            placeholder="Eg: Iphone 14, Galaxy S23"
            name="name"
            value={props.details.name}
            onChange={handleChange}
            required
            fullWidth
            label="Name"
            disabled={props.basicAdded}
          />
          <div className="invalid-feedback" id="name-feedback">
            Please enter the model name.
          </div>
        </div>
        <div className="col-lg-3 d-flex align-items-center mt-3 justify-content-evenly">
          <InputLabel>Launch On:</InputLabel>
          <TextField
            type="date"
            variant="standard"
            id="launch-date"
            name="launch_date"
            value={props.details.launch_date}
            onChange={handleChange}
            disabled={props.basicAdded}
            required
          />
          <div className="invalid-feedback" id="launch-date-feedback">
            Please enter the launch date.
          </div>
        </div>
        <div className="col-lg-2">
          <TextField
            type="number"
            label="Weight in Grams"
            id="weight"
            name="weight"
            value={props.details.weight}
            onChange={handleChange}
            disabled={props.basicAdded}
            required
            fullWidth
            variant="standard"
          />
          <div className="invalid-feedback" id="weight-feedback">
            Please enter the weight.
          </div>
        </div>
        <div className="col-lg-3">
          <TextField
            type="file"
            variant="standard"
            label="Thumbnail"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            disabled={props.basicAdded}
            required
            fullWidth
          />
          <div className="invalid-feedback" id="thumbnail-feedback">
            Please select a thumbnail.
          </div>
        </div>

        {colorAdded && (
          <div
            className="col-lg-12  mt-3 mb-3 p-3"
            style={{ border: "1px solid #294B29" }}
          >
            <h6 className="text-dark text-center mb-2">Added Colors</h6>

            <div className="d-flex justify-content-start">
              {props.details.colors.map((item, index) => (
                <div className="d-flex flex-column align-items-center me-4">
                  <IconButton onClick={() => handleColorRemove(index)}>
                    <CloseIcon
                      style={{
                        fontSize: "1rem",
                        margin: "0",
                        padding: "0",
                        color: "#294B29",
                      }}
                    />
                  </IconButton>
                  <span className="text-dark h6 m-0 p-0">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {variantAdded && (
          <div
            className="col-lg-12 p-3  mt-3 mb-3"
            style={{ border: "1px solid indigo" }}
          >
            <h6 className="text-dark text-center mb-3">Added Variants</h6>

            <div className="d-flex justify-content-start">
              {props.details.variations.map((item, index) => (
                <div className="d-flex flex-column me-4">
                  <IconButton
                    type="button"
                    style={{ color: "indigo" }}
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
        )}

        <div className="col-lg-3 mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            label="Description"
            id="description"
            name="description"
            value={props.details.description}
            onChange={handleChange}
            rows="4"
            cols="40"
            required
            disabled={props.basicAdded}
          />
          <div className="invalid-feedback" id="description-feedback">
            Please enter the description.
          </div>
        </div>
        <div className="col-lg-3 mt-3">
          <div className="d-flex align-items-center justify-content-evenly">
            <div>
              <TextField
                name="color"
                id="color"
                variant="standard"
                label="Color"
                disabled={props.basicAdded}
              />
            </div>
            <div>
              <Button
                type="button"
                onClick={handleColorsChange}
                style={{ color: "#3E3232", marginTop: "15px" }}
                disabled={props.basicAdded}
              >
                Add Color
              </Button>
            </div>
          </div>
        </div>

        <div className="col-lg-3 mt-3">
          <div className="d-flex align-items-center justify-content-evenly">
            <div>
              <TextField
                variant="standard"
                label="Variant"
                name="variant"
                id="variant"
                disabled={props.basicAdded}
              />
            </div>
            <div>
              <Button
                style={{ color: "#3E3232", marginTop: "15px" }}
                onClick={handleVariationChange}
                disabled={props.basicAdded}
                type="button"
              >
                Add Variant
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-3 d-flex justify-content-center align-items-center">
          <Button
            variant="outlined"
            type="button"
            onClick={handleConfirm}
            disabled={props.basicAdded}
          >
            Confirm Primary
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBasicDetails;
