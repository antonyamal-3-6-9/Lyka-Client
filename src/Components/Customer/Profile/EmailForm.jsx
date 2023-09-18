import React from "react";

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
        <div className="row mt-2">
          <div className="col-lg-3">
            <h6 className="h6">Email Information</h6>
          </div>
          <div className="col-lg-2">
            <a
              href="#"
              onClick={() => {
                if (isEmailEdit) {
                  setIsEmailEdit(false);
                  setIsEmailChanged(false);
                } else {
                  setIsEmailEdit(true);
                }
              }}
            >
              {isEmailEdit ? "Cancel" : "Edit"}
            </a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-6">
            <input
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
            />
          </div>
          {isEmailEdit && (
            <div className="col-lg-2 d-flex justify-content-center">
              <button className="btn btn-success btn-md" type="submit">
                Save
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default EmailForm;
