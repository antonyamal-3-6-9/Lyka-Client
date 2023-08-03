import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

export default function CheckoutForm(props) {
  const BASE_URL = "http://127.0.0.1:8000/payments/";

  const stripe = useStripe();
  const elements = useElements();

  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (paymentIntent) {
      try {
        const confirmPaymentResponse = await axios.patch(
          `${BASE_URL}capture-stripe.order/`,
          {
            order_id: props.order_id,
            payment_status: paymentIntent.status,
          }
        );
        if (confirmPaymentResponse.status === 200) {
          navigate("/order-placed")
        }
      } catch (error) {
        setAlertData(error.response.data.message)
        setAlertEnable(true)
        setAlertSeverity('error')
      }
    }

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        setAlertData(error.message)
        setAlertEnable(true)
        setAlertSeverity('error')
      } else {
        setAlertData("An unexpected error has been occured")
        setAlertEnable(true)
        setAlertSeverity('error')
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (

    <>
        <FloatingAlert
      message={alertData}
      severity={alertSeverity}
      enable={alertEnable}
      setEnable={setAlertEnable}
    />
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="btn btn-info w-100 m-0 mt-3"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  );
}
