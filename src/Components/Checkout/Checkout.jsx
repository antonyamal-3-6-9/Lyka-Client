import React, { useEffect, useState } from "react";
import CheckoutVerify from "./CheckoutVerify";
import "../Checkout/checkout.css";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckOutNav from "./CheckoutNav";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

const Checkout = () => {
  const [isSingleOrder, setIsSingleOrder] = useState(false);

  const [orderData, setOrderData] = useState();
  const [priceData, setPriceData] = useState();

  const [itemVerified, setItemVerified] = useState(true);
  const [addressAdded, setAddressAdded] = useState(false);
  const [isPayment, setIsPayment] = useState();
  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

  const [addressId, setAddressId] = useState({});

  const BASE_URL = "http://127.0.0.1:8000/order/";
  const token = localStorage.getItem("token");
  const order_id = sessionStorage.getItem("order_id");

  const navigate = useNavigate();

  const [subtotal, setSubTotal] = useState(0);
  const calculateMultipleSubTotal = (data) => {
    let total = 0;
    data.map((item) => {
      total = parseInt(total) + parseInt(item.item.product_price);
    });
    setSubTotal(total);
  };

  const calculateSingleSubTotal = (price) => {
    setSubTotal(price);
  };

  const getOrderPrice = async () => {
    try {
      const priceResponse = await axios.get(`${BASE_URL}get-order-price/${order_id}/`, {
        headers: {
          "content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPriceData(priceResponse.data)
    } catch (error) {
      setAlertData("Error getting price")
      setAlertEnable(true)
      setAlertSeverity("error")
    }
  };

  const CheckOrder = (order) => {
    if (Array.isArray(order)) {
      order.map((item) => {
        if (item.order_status !== null) {
          if (item.order_status === "Created") {
            getOrderPrice()
            if (
              item.shipping_address === null ||
              item.billing_address === null
            ) {
              setAddressAdded(true);
              setItemVerified(false);
              setIsPayment(false);
            } else {
              setAddressAdded(false);
              setItemVerified(false);
              setIsPayment(true);
            }
          } else {
            navigate("/");
          }
        }
      });
    } else {
      if (order.order_status !== null) {
        if (order.order_status === "Created") {
          getOrderPrice()
          if (
            order.shipping_address === null ||
            order.billing_address === null
          ) {
            setAddressAdded(true);
            setItemVerified(false);
            setIsPayment(false);
          } else {
            setAddressAdded(false);
            setItemVerified(false);
            setIsPayment(true);
          }
        } else {
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          `${BASE_URL}get-order/${order_id}/`,
          {
            headers: {
              "content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (orderResponse.status === 200) {
          CheckOrder(orderResponse.data);
          if (Array.isArray(orderResponse.data)) {
            setOrderData(orderResponse.data);
            calculateMultipleSubTotal(orderResponse.data);
            setIsSingleOrder(false);
          } else {
            setOrderData(orderResponse.data);
            calculateSingleSubTotal(orderResponse.data.item.product_price);
            setIsSingleOrder(true);
          }
        }
      } catch (error) {
        navigate(-1)
      }
    };
    fetchData();
  }, [token, order_id]);

  const itemConfirmation = async () => {
    try {
      const itemConfirmationResponse = await axios.patch(
        `${BASE_URL}confirm-items/${order_id}/`,
        {},
        {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (itemConfirmationResponse.status === 200) {
        return true;
      }
    } catch (error) {
      setAlertData(error.response.data.message)
      setAlertEnable(true)
      setAlertSeverity("error")
      return false
    }
  };

  const addressAdding = async () => {
    try {
      const addressAddingResponse = await axios.patch(
        `${BASE_URL}add-address/${order_id}/${addressId}/`,
        {},
        {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (addressAddingResponse.status === 200) {
        getOrderPrice()
        return true;
      }
    } catch (error) {
      setAlertData(error.response.data.message)
      setAlertEnable(true)
      setAlertSeverity("error")
      return false;
    }
  };

  const handleCancel = async () => {
    try{
      const cancelResponse = await axios.delete(`${BASE_URL}cancel-order/${order_id}/`, {
        headers: {
          "content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (cancelResponse.status === 200){
        sessionStorage.clear("order_id")
        navigate("/")
      }
    } catch (error){
      navigate("/")
    }
  }

  return (
    <>
      <div className="container-fluid p-5 mt-4" style={{width: "83%"}}>
      <FloatingAlert
        message={alertData}
        severity={alertSeverity}
        enable={alertEnable}
        setEnable={setAlertEnable}
      />
      <CheckOutNav
        handleCancel={handleCancel}
        setAddressAdded={setAddressAdded}
        addressAdded={addressAdded}
        isPayment={isPayment}
        setIsPayment={setIsPayment}
        setItemVerified={setItemVerified}
        itemVerified={itemVerified}
      />
            <div className="card mt-3 p-5">
                {itemVerified && (
                  <CheckoutVerify
                    data={orderData}
                    setData={setOrderData}
                    isSingle={isSingleOrder}
                    setIsItemVerified={setItemVerified}
                    setAddressAdded={setAddressAdded}
                    calculateMultipleSubTotal={calculateMultipleSubTotal}
                    calculateSingleSubTotal={calculateSingleSubTotal}
                    subtotal={subtotal}
                    itemConfirmation={itemConfirmation}
                    BASE_URL={BASE_URL}
                  />
                )}
                {addressAdded && (
                  <CheckoutAddress
                    addressId={addressId}
                    setAddressId={setAddressId}
                    setAddressAdded={setAddressAdded}
                    addressAdding={addressAdding}
                    setIsPayment={setIsPayment}
                  />
                )}
                {isPayment && (
                  <CheckoutPayment data={priceData} setData={setPriceData} />
                )}
              </div>
            </div>

    </>
  );
};

export default Checkout;
