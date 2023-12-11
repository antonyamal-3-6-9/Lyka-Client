import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import ModeEdit from "@mui/icons-material/ModeEdit";


const NumberForm = ({
  isPhoneEdit,
  setIsPhoneEdit,
  userData,
  numberData,
  setNumberData,
  isNumberChanged,
  setIsNumberChanged,
  handleNumberSubmit,
}) => {
  const handleChange = (e) => {
    setIsNumberChanged(true);
    setNumberData({
      ...numberData,
      user: { ...numberData.user, phone: e.target.value },
    });
  };

  return (
    <>
      <form onSubmit={handleNumberSubmit}>
      <div className="row mt-5 mb-2">
          <div className="col-lg-3 d-flex justify-content-start">
            <h5 className="h5">Phone Information</h5>
          </div>
          <div className="col-lg-2">
            <Button
              onClick={() => {
                if (isPhoneEdit) {
                  setIsPhoneEdit(false);
                  setIsNumberChanged(false);
                } else {
                  setIsPhoneEdit(true);
                }
              }}
              variant="text"
              startIcon={isPhoneEdit ? null : <ModeEdit/>}
            >
              {isPhoneEdit ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            {/* <input
              className={`form-control rounded-0 border-2 ${isPhoneEdit ? 'border-primary' : 'border-temporary'} bg-temporary p-3`}
              type="number"
              value={isNumberChanged ? numberData.user.phone : userData.user.phone}
              name="phone"
              onChange={handleChange}
              readOnly={!isPhoneEdit}
            /> */}
            <TextField
              variant="standard"
              type="number"
              name="phone"
              onChange={handleChange}
              disabled={!isPhoneEdit}
              required 
              value={isNumberChanged ? numberData.user.phone : userData.user.phone}
            />
          </div>
          {isPhoneEdit && 
          <div className="col-lg-2 d-flex justify-content-start">
            <Button
              variant="text"
              type="submit"
            >
              Save
            </Button>
          </div>}
        </div>
      </form>
    </>
  );
};

export default NumberForm;
