import React, { useEffect, useState } from "react";
import OrderProgress from "./OrderProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEllipsisVertical,
  faPencil,
  faPrint,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const SellerOrderDetails = () => {
  const { orderId } = useParams();
  const BASE_URL = "http://127.0.0.1:8000/order/";
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          `${BASE_URL}retrive/${orderId}/`,
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(orderResponse.data);
        console.log(orderResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  if (!order) {
    return null;
  }

  function calculateProfit(product_price, original_price) {
    return (
      parseInt(product_price) -
      parseInt(original_price)
    );
  }

  const formatAmountWithRupeeSymbol = (amount) => {
    amount = parseInt(amount);
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
      <div className="container-fluid mt-5">
        <div className="container">
          {/* Title */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="h5 mb-0">
              <a href="#" className="text-muted"></a>Order Id: {order.order_id}
            </h2>
          </div>

          {/* Main content */}
          <div className="row">
            <div className="col-lg-8">
              {/* Details */}
              <div className="card mb-4 p-3">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <span className="me-3">placed on: {order.time}</span>
                    <span className="badge rounded-pill bg-info">
                      {order.order_status}
                    </span>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                      <FontAwesomeIcon icon={faDownload} />{" "}
                      <span className="text">Invoice</span>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-link p-0 text-muted"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <a className="dropdown-item" href="#">
                            <FontAwesomeIcon icon={faPrint} /> Print
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <table className="table table-borderless">
                  <thead>
                    <th>Product</th>
                    <th>Color</th>
                    <th>Quantity</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <img
                              src={`http://127.0.0.1:8000/${order.item.product.thumbnail}`}
                              alt="Image"
                              width="35"
                              className="img-fluid"
                            />
                          </div>
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="h6">
                              {`${order.item.product.brand} ${order.item.product.name} ${order.item.product_variant.variation}`}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="h6">
                          {order.item.product_color.color}
                        </span>
                      </td>
                      <td className="text-start h6">{order.item.quantity}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="h6">Original Price</td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.item.original_price)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="h6">Selling Price</td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.item.selling_price)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="h6">Discount </td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.item.discount)}</td>
                    </tr>
                    {order.applied_coupon !== null && <tr>
                       <td colSpan="2" className="h6">
                        Coupon Discount (Code: {order.applied_coupon.code})
                      </td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.item.coupon_discount)}</td>
                    </tr>}
                    <tr>
                      <td colSpan="2" className="h6">Shipping Charge </td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.shipping_charge)}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td colSpan="2" className="h6">TOTAL</td>
                      <td className="text-end h5">{formatAmountWithRupeeSymbol(order.item.product_price)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="h6">Profit</td>
                      <td className="text-success text-end h5">
                        {formatAmountWithRupeeSymbol(calculateProfit(
                          order.item.product_price,
                          order.item.original_price
                        ))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="card mb-4">
                <OrderProgress status={order.order_status} tracking_id={order.credentials.tracking_id} delivery_date={order.delivery_date}/>
              </div>


              <div className="card mb-4 p-3">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Method: </h4>
                      </div>
                      <div className="col-lg-6">
                        <h3>{order.payment_method}</h3>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Status: </h4>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className={`"btn" ${
                            order.payment_status ? "btn-success" : "btn-danger"
                          }`}
                          disabled
                        >
                          {order.payment_status ? "Paid" : "Unpaid"}
                        </button>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-lg-6">
                        <h4 className="h6">Payment Id: </h4>
                      </div>
                      <div className="col-lg-6">
                        <p>{order.credentials.payment_id}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4 p-3">
                <h3 className="h6">Shipping Information</h3>
                <span>Tracking code: {order.credentials.tracking_id}</span>
                <hr />
                <h3 className="h6">Shipping Address</h3>
                <address>
                  <strong>{order.shipping_address.name}</strong>
                  <br />
                  {order.shipping_address.street_one},{" "}
                  {order.shipping_address.street_two}
                  <br />
                  {order.shipping_address.landmark},{" "}
                  {order.shipping_address.city}
                  <br />
                  {order.shipping_address.state},{" "}
                  {order.shipping_address.country},{" "}
                  {order.shipping_address.zip_code}
                  <br />
                  <span>Phone: </span>
                  {order.shipping_address.phone}, <br/> <span>Alternate Phone: </span>
                  +91 {order.shipping_address.alternate_phone}
                </address>
              </div>
              <div className="card mb-4 p-3">
                <h3 className="h6">PickUp Information</h3>
                <span>Store Name: <span className="h5">{order.pickup_address.store_name}</span></span>
                <hr />
                <h3 className="h6">Store Address</h3>
                <address>
                  <strong>{order.pickup_address.name}</strong>
                  <br />
                  {order.pickup_address.street_one},{" "}
                  {order.pickup_address.street_two}
                  <br />
                  {order.pickup_address.landmark}, {order.pickup_address.city}
                  <br />
                  {order.pickup_address.state}, {order.pickup_address.country},{" "}
                  {order.pickup_address.zip_code}
                  <br />
                  <span>Phone: </span> +91 {order.pickup_address.phone},<br/>
                  <span>Alternate Phone: </span>
                  {order.pickup_address.alternate_phone}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerOrderDetails;
