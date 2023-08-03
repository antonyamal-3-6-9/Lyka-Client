import React from "react";

const ProductTagCard = (props) => {
  return (
    <>
      <div className="card h-100 border-0">
        <div id="tag-container" className="h-100 d-flex align-items-center justify-content-center">
            <div className="tag-content text-center">
                <h2>{props.tag}</h2>
                <button className="btn btn-outline-danger mt-5">View All</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductTagCard