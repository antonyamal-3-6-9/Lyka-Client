import React from "react";
import { useState } from "react";
import StateSelect from "./StateSelect";
import axios from "axios";

const AddNewAddressForm = (props) => {
  const BASE_URL = "http://127.0.0.1:8000/address/";

  const [newAddress, setNewAddress] = useState({
    name: "",
    street_one: "",
    street_two: "",
    city: "",
    state: "",
    country: "India",
    phone: "",
    alternate_phone: "",
    landmark: "",
    zip_code: "",
    address_type: "",
  });

  const handleChange = (e) => {
    setNewAddress({...newAddress, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(newAddress)
    const token = localStorage.getItem("token");
    try {
      const newAddressResponse = await axios.post(
        `${BASE_URL}create-customer-address/`,
        {
          newAddress,
        },
        {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (newAddressResponse.status === 200) {
        const updatedAddress = props.savedAddress
        updatedAddress.push(newAddressResponse.data)
        props.setSavedAddress(updatedAddress)
        props.setIsAddNewAddress(false)
        props.setAddressId(newAddressResponse.data.id)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="name"
              value={newAddress.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Valid Store Name is required.
            </div>
          </div>

          <div className="col-6">
            <label className="form-label">Street One</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="street_one"
              value={newAddress.street_one}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Valid Street One is required.
            </div>
          </div>

          <div className="col-6">
            <label className="form-label">Street Two</label>
            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                placeholder=""
                name="street_two"
                value={newAddress.street_two}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Your Street Two is required.
              </div>
            </div>
          </div>
          <div className="col-6">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              name="phone"
              value={newAddress.phone}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please enter a valid phone.</div>
          </div>

          <div className="col-6">
            <label className="form-label">Alternate Phone</label>
            <input
              type="number"
              className="form-control"
              placeholder=""
              name="alternate_phone"
              value={newAddress.alternate_phone}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid alternate phone.
            </div>
          </div>

          <div className="col-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="city"
              value={newAddress.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="landmark"
              value={newAddress.landmark}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              required
              readOnly
              value={newAddress.country}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
          </div>

          <div className="col-4">
            <label className="form-label">State</label>
            <StateSelect value={newAddress.state} onChange={handleChange}/>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>

          <div className="col-4">
            <label className="form-label">Zip</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder=""
              name="zip_code"
              value={newAddress.zip_code}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Zip code required.</div>
          </div>
          <div className="col-4">
            <label className="form-label">Address Type</label>
            <select
              className="form-select"
              name="address_type"
              value={newAddress.address_type}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>
            <div className="invalid-feedback">Zip code required.</div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-outline-success">
            Save and Deliver Here
          </button>
        </div>
      </form>
      ;
    </>
  );
};

export default AddNewAddressForm;
