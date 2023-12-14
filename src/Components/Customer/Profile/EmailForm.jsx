import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import ModeEdit from "@mui/icons-material/ModeEdit";


const EmailForm = ({
  isEmailEdit,
  setIsEmailEdit,
  userData,
  emailData,
  setEmailData,
  isEmailChanged,
  setIsEmailChanged,
  handleSubmit,
  otpCreate,
}) => {
  const handleChange = (e) => {
    setIsEmailChanged(true);
    setEmailData({
      ...emailData,
      user: {
        ...emailData.user,
        email: e.target.value,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row mt-5">
          <div className="col-lg-3 d-flex justify-content-start">
            <h5 className="h5">Email</h5>
          </div>
          <div className="col-lg-2">
            <Button
              variant="text"
              onClick={() => {
                if (isEmailEdit) {
                  setIsEmailEdit(false);
                  setIsEmailChanged(false);
                } else {
                  setIsEmailEdit(true);
                }
              }}
              startIcon={isEmailEdit ? null : <ModeEdit />}
              style={{color:"#16213E"}}
            >
              {isEmailEdit ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-3">
            {/* <input
              className={`form-control rounded-0 border-2 ${
                isEmailEdit ? "border-primary" : "border-temporary"
              } bg-temporary p-3`}
              type="email"
              value={
                isEmailChanged ? emailData.user.email : userData.user.email
              }
              onChange={handleChange}
              name="email"
              readOnly={!isEmailEdit}
            /> */}
            <TextField
              id="standard-basic"
              variant="standard"
              name="email"
              onChange={handleChange}
              type="email"
              value={isEmailChanged ? emailData.user.email : userData.user.email}
              disabled={!isEmailEdit}
            ></TextField>
          </div>
          {isEmailEdit && (
            <div className="col-lg-3 d-flex justify-content-start">
              <Button type="submit" variant="text" style={{color:"#16213E"}}>
                Save
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default EmailForm;
