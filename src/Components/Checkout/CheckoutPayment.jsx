import React, { useEffect, useState } from "react";
import MakePayment from "./MakePayment";
import axios from "axios";

const CheckoutPayment = ({ data, setData }) => {
  const BASE_URL = "http://127.0.0.1:8000/payments/";
  const [coupons, setCoupons] = useState();
  const order_id = sessionStorage.getItem('order_id')
  const token = localStorage.getItem('token')

  const formatAmountWithRupeeSymbol = (amountStr) => {
    const amount = parseInt(amountStr);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const couponResponse = await axios.get(`${BASE_URL}get-coupons/`);
        console.log(couponResponse);
        setCoupons(couponResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [BASE_URL]);

  if (!coupons){
    return
  }

  const handleApplyCoupon = async (coupon_code) => {
    try{
      const applyCouponResponse = await axios.post(`http://127.0.0.1:8000/order/apply-coupon/`, {
        coupon_code : coupon_code,
        order_id : order_id
      },
      {
        headers: {
          "content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(applyCouponResponse)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            {data.type === "multiple" ? (
              <>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Selling Price: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_selling_price
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Discount: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.discount
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Taxes and charges: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.additional_charges
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-4">
                      <h4>Total: </h4>
                    </div>
                    <div className="col-lg-8">
                      <h2>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_price
                          )}
                        </strong>
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Selling Price: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.selling_price
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Discount: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.discount
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Taxes and charges: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.additional_charges
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card rounded-0 ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-4">
                      <h4>Total: </h4>
                    </div>
                    <div className="col-lg-8">
                      <h2>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.product_price
                          )}
                        </strong>
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            )}
            {coupons.map((coupon) => (
              <div
                className="card rounded-0 ps-3 m-3"
              >
                <div className="row h-100 d-flex align-items-center justify-content-center">
                    <h5>{coupon.code}</h5>
                      <strong>{coupon.description}</strong>
                      <p>minimum Purchase: <strong>{coupon.minimum_purchase_amount}</strong></p>
                      <button className="btn btn-light m-0 w-50" onClick={() => handleApplyCoupon(coupon.code)}>
                        Apply
                      </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-8">
            <MakePayment />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
