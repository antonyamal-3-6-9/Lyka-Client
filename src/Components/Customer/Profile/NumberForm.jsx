import React from "react";

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
          <div className="col-lg-3">
            <h6 className="h6">Phone Information</h6>
          </div>
          <div className="col-lg-2">
            <a
              href="#"
              onClick={() => {
                if (isPhoneEdit) {
                  setIsPhoneEdit(false);
                  setIsNumberChanged(false);
                } else {
                  setIsPhoneEdit(true);
                }
              }}
            >
              {isPhoneEdit ? "Cancel" : "Edit"}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <input
              className={`form-control rounded-0 border-2 ${isPhoneEdit ? 'border-primary' : 'border-temporary'} bg-temporary p-3`}
              type="number"
              value={isNumberChanged ? numberData.user.phone : userData.user.phone}
              name="phone"
              onChange={handleChange}
              readOnly={!isPhoneEdit}
            />
          </div>
          {isPhoneEdit && 
          <div className="col-lg-2 d-flex justify-content-center">
            <button
              className="btn btn-success btn-md"
              type="submit"
            >
              Save
            </button>
          </div>}
        </div>
      </form>
    </>
  );
};

export default NumberForm;
