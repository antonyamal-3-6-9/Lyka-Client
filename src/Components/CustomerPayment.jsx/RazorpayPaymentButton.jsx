import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const RazorpayPaymentButton = (props) => {

  const BASE_URL = "http://127.0.0.1:8000/payments/";

  const order_id = sessionStorage.getItem("order_id")
  let razorpay_order_id = null
  const navigate = useNavigate()

  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePayNow = async () => {
    const payload = {
      order_id: order_id,
    };

    const token = localStorage.getItem("token");
    console.log(token)
    try {
      setIsLoading(true)
      const orderDetails = await axios.post(BASE_URL + "razorpay-create/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(orderDetails)
      if (orderDetails.status === 200) {
        options.key = orderDetails.data.test_id;
        options.amount = orderDetails.data.order.amount;
        options.order_id = orderDetails.data.order.id;
        setIsLoading(false)
        return true;
      } else {
        setIsLoading(false)
        return false;
      }
    } catch (error) {
      setAlertEnable(true)
      setAlertData(error.response.data.message)
      setAlertSeverity('error')
      setIsLoading(false)
      console.log(error)
      return false;
    }
  };

  const handleClick = async () => {
    setIsLoading(true)
    if (await handlePayNow() === true) {
      setIsLoading(false)
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", handleRazorpayResponse);
    } else {
      console.log("false")
      setIsLoading(false)
      return;
    }
  };

  const handleRazorpayResponse = async (response) => {
    const payload = {
      payment_id: response.razorpay_payment_id,
      order_id: response.razorpay_order_id,
      razorpay_signature : response.razorpay_signature,
      lyka_order_id : order_id
    };

    const token = localStorage.getItem("token");
    try {
      setIsLoading(true)
      const paymentResponse = await axios.post(BASE_URL + "razorpay-capture/", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (paymentResponse.status === 200) {
        setIsLoading(false)
        navigate("/order-placed")
      }
    } catch (error) {
      setAlertEnable(true)
      setAlertData(error.response.data.message)
      setAlertSeverity('error')
      setIsLoading(false)
    }
  };
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const options = {
    key: "",
    amount: "",
    currency: "INR",
    name: "LYKA",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "",
    handler: handleRazorpayResponse,
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9000090000",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };


  return (
    <div>
    <FloatingAlert
      message={alertData}
      severity={alertSeverity}
      enable={alertEnable}
      setEnable={setAlertEnable}
    />
    <Backdrop
      open={isLoading}
    >
      <CircularProgress/>
    </Backdrop>
      <button id="rzp-button1" onClick={handleClick} className="btn btn-dark border rounded-3 h-100 w-100">
        Pay with Razorpay
      </button>
    </div>
  );
};

export default RazorpayPaymentButton;
