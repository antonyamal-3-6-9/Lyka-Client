import React, { useEffect, useState } from "react";
import MakePayment from "./MakePayment";
import axios from "axios";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

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
          <div className="col-lg-6">
          <Item>
            {data.type === "multiple" ? (
              
              <>
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Selling Price: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                       
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_selling_price
                          )}
                        
                      </h6>
                    </div>
                  </div>

                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Discount: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.discount
                          )}
                      
                      </h6>
                    </div>
                  </div>
                  
                {data.price_details.coupon_discount !== 0 &&  

                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Coupon Discount </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                      
                          {formatAmountWithRupeeSymbol(
                            data.price_details.coupon_discount
                          )}
                 
                      </h6>
                    </div>
                </div>}
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Taxes and charges: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.additional_charges
                          )}
                        
                      </h6>
                    </div>
                  </div>
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Shipping Charge: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_shipping_charge
                          )}
                   
                      </h6>
                    </div>
                  </div>
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Total: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h5 className="h5">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.total_price
                          )}
                        
                      </h5>
                    </div>
                  </div>
                  </>
              
            ) : (
              <>

              <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Selling Price: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                       
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.total_selling_price
                          )}
                        
                      </h6>
                    </div>
                  </div>

                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Discount: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.discount
                          )}
                      
                      </h6>
                    </div>
                  </div>
                  
                {data.price_details.coupon_discount !== 0 &&  

                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Coupon Discount </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                      
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.coupon_discount
                          )}
                 
                      </h6>
                    </div>
                </div>}
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Taxes and charges: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.additional_charges
                          )}
                        
                      </h6>
                    </div>
                  </div>
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h6>Shipping Charge: </h6>
                    </div>
                    <div className="col-lg-5">
                      <h6 className="h6">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.total_shipping_charge
                          )}
                   
                      </h6>
                    </div>
                  </div>
                  <div className="row h-100 d-flex align-items-center">
                    <div className="col-lg-7">
                      <h5>Total: </h5>
                    </div>
                    <div className="col-lg-5">
                      <h5 className="h5">
                        
                          {formatAmountWithRupeeSymbol(
                            data.price_details.item.total_price
                          )}
                        
                      </h5>
                    </div>
                  </div>
      
              </>
            )}
            {coupons.map((coupon) => (

              <div className="text-center p-2 m-3" style={{border: "1px dotted #0F3460", borderRadius: "5px"}}>
                    <h5>{coupon.code}</h5>
                      <strong>{coupon.description}</strong>
                      <p>minimum Purchase: <strong>{coupon.minimum_purchase_amount}</strong></p>
                      <Button variant="contained" onClick={() => handleApplyCoupon(coupon.code)} disabled={isCouponApplied} style={{backgroundColor: "#16213E"}}>
                        Apply
                      </Button>
      
            </div>
            ))}
            </Item>
          </div>
          <div className="col-lg-6">
          <Item>
            <MakePayment />
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
