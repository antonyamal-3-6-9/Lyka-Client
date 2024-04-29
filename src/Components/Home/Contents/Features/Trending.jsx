import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Trending({ trendingUnits }) {
  const formatAmountWithRupeeSymbol = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      return "Invalid Amount";
    }
    const formattedAmount = amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      style: "currency",
      currency: "INR",
    });

    return formattedAmount;
  };

  return (
    <>
      <div className="col-lg-6">
        <h3 className="text-dark text-center h4">Trending Products</h3>
        <Carousel
          data-bs-theme="dark"
          interval={1300}
          indicatorLabels={false}
          indicators={false}
        >
          {trendingUnits.map((unit, index) => (
            <Carousel.Item key={index}>
              <div               style={{
                backgroundColor: "#fff",
              }} className="p-3">
                <div className="row">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <img
                      src={`http://127.0.0.1:8000${unit.product.thumbnail}`}
                      style={{ width: "300px" }}
                      alt={`${unit.product.brand} ${unit.product.name}`}
                    />
                  </div>
                  <div></div>
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                      <h6 className="h5 text-dark m-2">
                        {unit.product.brand} {unit.product.name}
                      </h6>
                      <p>
                        <span>Only </span>
                        <span className="h6 text-dark">{unit.stock}</span>
                        <span> left</span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                      <span className="h6 text-dark text-decoration-line-through m-2">
                        {`${formatAmountWithRupeeSymbol(unit.selling_price)}   `}
                      </span>
                      <span className="h5 text-dark m-2">
                        {formatAmountWithRupeeSymbol(unit.offer_price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
