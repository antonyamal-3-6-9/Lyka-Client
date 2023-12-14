import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import ModeEdit from "@mui/icons-material/ModeEdit";

const NameForm = ({
  isBasicEdit,
  setIsBasicEdit,
  userData,
  basicData,
  setBasicData,
  isBasicChanged,
  setIsBasicChanged,
  handleSubmit,
}) => {
  const [is_last_name, setIsLastName] = useState(false);

  const handleFirstName = (e) => {
    setIsBasicChanged(true);
    setBasicData({
      ...basicData,
      user: { ...basicData.user, [e.target.name]: e.target.value },
    });
  };

  const handleLastName = (e) => {
    setIsLastName(true);
    setBasicData({
      ...basicData,
      user: { ...basicData.user, [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-3">
            <h5 className="h5">Personal Information</h5>
          </div>
          <div className="col-lg-2">
            <Button
              variant="text"
              onClick={() => {
                if (isBasicEdit) {
                  setIsBasicEdit(false);
                  setIsBasicChanged(false);
                } else {
                  setIsBasicEdit(true);
                }
              }}
              startIcon={isBasicEdit ? null : <ModeEdit />}
              style={{color:"#16213E"}}
            >
              {isBasicEdit ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="row mt-3 mb-5">
          <div className="col-lg-3">
            {/* <input
              key="first-name"
              className={`form-control rounded-0 border-2 ${isBasicEdit ? 'border-primary' : 'border-temporary'} bg-temporary p-3`}
              type="text"
              value={
             basicData.user.first_name
              }
              name="first_name"
              required
              onChange={handleFirstName}
            /> */}
            <TextField
              variant="standard"
              onChange={handleFirstName}
              value={
                isBasicChanged
                  ? basicData.user.first_name
                  : userData.user.first_name
              }
              required
              name="first_name"
              disabled={!isBasicEdit}
              type="text"
              key="first"
            />
          </div>
          <div className="col-lg-3">
            {/* <input
              key="last-name"
              className={`form-control rounded-0 border-2 ${isBasicEdit ? 'border-primary' : 'border-temporary'} bg-temporary p-3`}
              type="text"
              value={
                is_last_name
                  ? basicData.user.last_name
                  : userData.user.last_name
              }
              name="last_name"
              readOnly={!isBasicEdit}
              onChange={handleLastName}
              required
            /> */}
            <TextField
              variant="standard"
              onChange={handleLastName}
              value={
                is_last_name
                  ? basicData.user.last_name
                  : userData.user.last_name
              }
              required
              name="last_name"
              disabled={!isBasicEdit}
              type="text"
              key="last"
            />
          </div>
          {isBasicEdit && (
            <div className="col-lg-2 d-flex justify-content-start">
              <Button variant="text" style={{color:"#16213E"}} type="submit">
                Save
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default NameForm;
