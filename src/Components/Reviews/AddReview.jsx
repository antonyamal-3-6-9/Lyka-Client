import React from "react";
import Button from "@mui/material/Button";


export default function AddReviewModal({setAddNew}) {

  return (
    <>
      <form>
        <h6 className="text-dark text-center h4">Enter a Review</h6>
        <div className="p-3">
          <textarea
            rows={5}
            className="form-control"
            style={{ width: "100%" }}
          />
        </div>
        <div className="d-flex justify-content-evenly align-items-center mt-3">
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#234456" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            type="button"
            style={{ backgroundColor: "#234456" }}
            onClick={() => {setAddNew(false)}}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
