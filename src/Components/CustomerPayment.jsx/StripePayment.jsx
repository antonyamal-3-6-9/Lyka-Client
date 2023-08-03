import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./StripeCheckoutform";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NNgMcSFoVzzDNdPb2m7qQV6vxOBixYyYNoGVlOg1ARQcyvqypfO8xA569zFlVbNT0mclyhRsi4Zco7ELGTi7nkG00M6Prhcnh"
);

export default function StripePayment() {
  const BASE_URL = "http://127.0.0.1:8000/payments/";

  const [clientSecret, setClientSecret] = useState("");
  const order_id = sessionStorage.getItem("order_id");
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stripeCreateResponse = await axios.post(
          `${BASE_URL}create-stripe-order/`,
          {
            order_id: order_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setClientSecret(stripeCreateResponse.data.secret)
      } catch (error) {}
    };
    fetchData()
  }, []);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm 
            order_id={order_id}
          />
        </Elements>
      )}
    </div>
  );
}
