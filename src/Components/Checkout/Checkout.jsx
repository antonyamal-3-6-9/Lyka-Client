import React, { useEffect, useState } from "react";
import CheckoutVerify from "./CheckoutVerify";
import "../Checkout/checkout.css";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [isSingleOrder, setIsSingleOrder] = useState(false);

  const [orderData, setOrderData] = useState();
  const [priceData, setPriceData] = useState();

  const [itemVerified, setItemVerified] = useState(true);
  const [addressAdded, setAddressAdded] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

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
      console.log("error")
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
        navigate("/");
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
        console.log(error);
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
        setPriceData(itemConfirmationResponse.data);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
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
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="container-fluid p-5 mt-5">
        <div className="row h-100">
          <div className="col-lg-12 h-100">
            <div className="card h-100 w-100 m-0 border-0 rounded-0">
              <div className="container-fluid w-100 h-100">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
