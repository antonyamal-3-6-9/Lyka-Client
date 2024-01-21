import React from "react";
import { Button } from "@mui/material";

const AdditemForm = (props) => {
  const handleChange = (e) => {
    if (e.target.name === "color_code" || e.target.name === "variant") {
      props.setNewVariant({
        ...props.newVariant,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      props.setNewVariant({
        ...props.newVariant,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-2">
          <label htmlFor="color-select" className="text-dark">Variant</label>
          <select
            className="form-select form-select-sm"
            id="color-select"
            aria-label=".form-select-sm example"
            name="variant"
            required
            onChange={handleChange}
          >
            <option value="">Open this select menu</option>
            {props.variants.map((item) => (
              <option key={item.id} value={item.id}>
                {item.variation}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-1">
          <label htmlFor="variant-select" className="text-dark">Color</label>
          <select
            className="form-select form-select-sm"
            id="variant-select"
            aria-label=".form-select-sm example"
            name="color_code"
            required
            onChange={handleChange}
          >
            <option value="">Open this select menu</option>
            {props.colors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.color}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-2">
          <label htmlFor="launch-date" className="text-dark">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            placeholder="stock"
            name="stock"
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback" id="launch-date-feedback">
            Please enter the stock
          </div>
        </div>

        <div className="col-lg-1">
        <label htmlFor="color-select" className="text-dark">warehouse</label>
          <select
            className="form-select form-select-sm"
            id="wareshouse-select"
            aria-label=".form-select-sm example"
            name="warehouse"
            required
            onChange={handleChange}
          >
            <option value="">Open this select menu</option>
            {props.pickupStore.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.store_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-2">
          <label htmlFor="original-price" className="text-dark">Original Price</label>
          <input
            type="number"
            className="form-control"
            id="original-price"
            placeholder="Eg: 15000"
            name="original_price"
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback" id="original-price-feedback">
            Please enter the original price.
          </div>
        </div>
        <div className="col-lg-2">
          <label htmlFor="selling-price" className="text-dark">Selling Price</label>
          <input
            type="number"
            className="form-control"
            id="selling-price"
            placeholder="Eg: 18000"
            name="selling_price"
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback" id="selling-price-feedback">
            Please enter the selling price.
          </div>
        </div>
        <div className="col-lg-2">
          <label htmlFor="offer-price" className="text-dark">Offer Price</label>
          <input
            type="number"
            className="form-control"
            id="offer-price"
            placeholder="Eg: 17000"
            name="offer_price"
            required
            onChange={handleChange}
          />
          <div className="invalid-feedback" id="offer-price-feedback">
            Please enter the offer price.
          </div>
        </div>
        <div className="col-lg-12 d-flex align-items-center justify-content-center">
          <Button variant="contained"  style={{backgroundColor: "#3E3232"}} sx={{mt: 3}} type="submit">
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdditemForm;
