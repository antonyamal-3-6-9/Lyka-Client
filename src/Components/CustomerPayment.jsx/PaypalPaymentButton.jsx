import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import { useState } from "react";


function PaypalPaymentButton() {

  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")


  const navigate = useNavigate()

  const FUNDING_SOURCES = [
    FUNDING.PAYPAL,
    FUNDING.PAYLATER,
    FUNDING.VENMO,
    FUNDING.CARD,
  ];

  const token = localStorage.getItem("token");
  const order_id = sessionStorage.getItem("order_id");

  const initialOptions = {
    "client-id":
      "AWVe88a6tGDQF7ale3ITOvPR6Sz9qGgACgb6cQBy_d0iUbl_zhUWtoxSW0RZ-iW_02kGmlvEaHQKFY_k",
    "enable-funding": "paylater,venmo",
  };

  return (
    <>
    <FloatingAlert
      message={alertData}
      enable={alertEnable}
      severity={alertSeverity}
      setEnable={setAlertEnable}
    />
      <PayPalScriptProvider options={initialOptions}>
        {FUNDING_SOURCES.map((fundingSource) => {
          return (
            <PayPalButtons
              fundingSource={fundingSource}
              key={fundingSource}
              style={{
                layout: "vertical",
                shape: "rect",
                color: "black",
              }}
              createOrder={async (data, actions) => {
                try {
                  const response = await axios.post(
                    "http://localhost:8000/payments/create-paypal-order/",
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

                  if (response.status === 200) {
                    return response.data.order_id;
                  }
                } catch (error) {
                  setAlertEnable(true)
                  setAlertData(error.response.data.message)
                  setAlertSeverity('error')
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await axios.patch(
                    `http://localhost:8000/payments/capture-paypal-order/${data.orderID}/${order_id}/`,
                    {},
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                      },
                    }
                  );

                  if (response.status === 200){
                    navigate("/order-placed")
                  }
        
                } catch (error) {
                  setAlertEnable(true)
                  setAlertData(error.response.data.message)
                  setAlertSeverity('error')
                }
              }}
            />
          );
        })}
      </PayPalScriptProvider>
      </>
  );
}

export default PaypalPaymentButton
