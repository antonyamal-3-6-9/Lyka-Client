import React from "react";

export default function ListReview({rating, review}) {
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <span>3 Star</span>
        </div>
        <div className="col-lg-9">
          <span>
            Compact design, vibrant display. Impressive camera captures every
            detail. Swift performance, smooth multitasking. Long-lasting
            battery. Top-notch security features. Overall, a fantastic
            smartphone experience. Highly recommended!
          </span>
        </div>
      </div>
    </>
  );
}
