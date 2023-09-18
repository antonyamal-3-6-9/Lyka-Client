import React, { useEffect, useState } from "react";
import MakePayment from "./MakePayment";
import axios from "axios";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

const CheckoutPayment = ({ data, setData }) => {

  const BASE_URL = "http://127.0.0.1:8000/payments/";
  const [coupons, setCoupons] = useState();
  const order_id = sessionStorage.getItem('order_id')
  const token = localStorage.getItem('token')
  const [isCouponApplied, setIsCouponApplied] = useState(false)

  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

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
        setCoupons(couponResponse.data);
      } catch (error) {
        setAlertData("Error fetching coupons")
        setAlertEnable(true)
        setAlertSeverity("error")
      }
    };
    fetchData();
  }, [BASE_URL]);

  if (!data){
    return null
  }

  if (!coupons){
    return null
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
      setIsCouponApplied(true)
      if(data.type === "single"){
        setData({...data, price_details : {...data.price_details, item : {...data.price_details.item, coupon_discount : applyCouponResponse.data.coupon_discount, product_price: applyCouponResponse.data.total_price}} })
      } else if(data.type === "multiple"){
        setData({...data, price_details : {...data.price_details, coupon_discount : applyCouponResponse.data.coupon_discount, total_price: applyCouponResponse.data.total_price}})
      }
    } catch (error) {
      if(error.response.status === 406){
        setAlertData("Coupon is already applied for the current order")
        setAlertEnable(true)
        setAlertSeverity("error")
        setIsCouponApplied(true)
      } else {
        setAlertData(error.response.data.message)
        setAlertEnable(true)
        setAlertSeverity("error")
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
      <FloatingAlert
        message={alertData}
        setEnable={setAlertEnable}
        enable={alertEnable}
        severity={alertSeverity}
      />
        <div className="row">
          <div className="col-lg-6 m-0 p-0">
            {data.type === "multiple" ? (
              <>
                <div
                  className="card ps-3 m-3"
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
                  className="card ps-3 m-3"
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
                {data.price_details.coupon_discount !== 0 &&  
                <div
                  className="card ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Coupon Discount </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.coupon_discount
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>}
                <div
                  className="card ps-3 m-3"
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
                  className="card ps-3 m-3"
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
                <div
                  className="card ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-4">
                      <h4>Shipping Charge: </h4>
                    </div>
                    <div className="col-lg-8">
                      <h2>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_shipping_charge
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
                  className="card ps-3 m-3"
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
                            data.price_details.item.selling_price
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card ps-3 m-3"
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
                            data.price_details.item.discount
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                {data.coupon_discount !== "0" &&  
                <div
                  className="card ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Coupon Discount: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h4>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.coupon_discount
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>}
                <div
                  className="card ps-3 m-3"
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
                            data.price_details.item.additional_charges
                          )}
                        </strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card ps-3 m-3"
                  style={{ height: "80px" }}
                >
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-4">
                      <h4>Shipping Charge: </h4>
                    </div>
                    <div className="col-lg-8">
                      <h2>
                        <strong>
                          {formatAmountWithRupeeSymbol(
                            data.price_details.shipping_charge
                          )}
                        </strong>
                      </h2>
                    </div>
                  </div>
                </div>
                <div
                  className="card ps-3 m-3"
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
                            data.price_details.item.product_price
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
                className="card ps-3 m-3"
              >
                <div className="row h-100 d-flex align-items-center justify-content-center">
                    <h5>{coupon.code}</h5>
                      <strong>{coupon.description}</strong>
                      <p>minimum Purchase: <strong>{coupon.minimum_purchase_amount}</strong></p>
                      <button className="btn btn-warning m-0 w-50" onClick={() => handleApplyCoupon(coupon.code)} disabled={isCouponApplied}>
                        Apply
                      </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-6 m-0 p-0">
            <MakePayment />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
