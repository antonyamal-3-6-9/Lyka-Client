import React, { useState } from "react";

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

  const [is_last_name, setIsLastName] = useState(false)

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
            <h6 className="h6">Personal Information</h6>
          </div>
          <div className="col-lg-2">
            <a
              href="#"
              onClick={() => {
                if (isBasicEdit) {
                  setIsBasicEdit(false);
                  setIsBasicChanged(false);
                } else {
                  setIsBasicEdit(true);
                }
              }}
            >
              {isBasicEdit ? "Cancel" : "Edit"}
            </a>
          </div>
        </div>
        <div className="row mt-3 mb-5">
          <div className="col-lg-3">
            <input
              className={`form-control rounded-0 border-2 ${isBasicEdit ? 'border-primary' : 'border-temporary'} bg-temporary p-3`}
              type="text"
              value={
                isBasicChanged
                  ? basicData.user.first_name
                  : userData.user.first_name
              }
              name="first_name"
              onChange={handleFirstName}
              readOnly={!isBasicEdit}
              required
            />
          </div>
          <div className="col-lg-3">
            <input
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
            />
          </div>
          {isBasicEdit && 
          <div className="col-lg-2 d-flex justify-content-center pb-5">
            <button className="btn btn-success btn-md" type="submit">
              Save
            </button>
          </div>}
        </div>
      </form>
    </>
  );
};

export default NameForm;
