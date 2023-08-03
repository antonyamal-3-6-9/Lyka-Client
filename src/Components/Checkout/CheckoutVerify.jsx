import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const CheckoutVerify = ({ data, setData, isSingle, setIsItemVerified, calculateMultipleSubTotal, calculateSingleSubTotal, subtotal, setAddressAdded, BASE_URL, itemConfirmation }) => {

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

  const handleIncreaseQuantity = (order_id) => {
    if (isSingle) {
      const oldQuantity = data.item.quantity
      const newQuantity = parseInt(oldQuantity) + 1
      const newPrice = (parseInt(data.item.product_price) / parseInt(oldQuantity)) * parseInt(newQuantity)
      setData({...data, item : {...data.item, product_price : newPrice, quantity : newQuantity}})
      calculateSingleSubTotal(newPrice)
    } else {
      const newData = [...data]
      const unitIndex = newData.findIndex((order) => order.order_id === order_id)
      const oldQuantity = newData[unitIndex].item.quantity 
      const newQuantity = parseInt(oldQuantity) + 1
      const newPrice = (parseInt(newData[unitIndex].item.product_price) / parseInt(oldQuantity)) * parseInt(newQuantity)
      newData[unitIndex].item.product_price = newPrice
      newData[unitIndex].item.quantity = newQuantity
      setData(newData)
      calculateMultipleSubTotal(newData)
    }
  }

  const handleItemIncrement = async (order_id) => {
    try{
    const incrementResponse = await axios.patch(`${BASE_URL}increament-item/${order_id}/`, {}, {
      headers: {
        "content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if (incrementResponse.status === 200){
      handleIncreaseQuantity(order_id)
    }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDecreaseQuantity = (order_id) => {
    if (isSingle) {
      const oldQuantity = data.item.quantity
      if (oldQuantity <= 1){
        return
      }
      const newQuantity = parseInt(oldQuantity) - 1
      const newPrice = (parseInt(data.item.product_price) / parseInt(oldQuantity)) * parseInt(newQuantity)
      setData({...data, item : {...data.item, product_price : newPrice, quantity: newQuantity}})
      calculateSingleSubTotal(newPrice)
    } else {
      const newData = [...data]
      const unitIndex = newData.findIndex((order) => order.order_id === order_id)
      const oldQuantity = newData[unitIndex].item.quantity
      if (oldQuantity <= 1){
        return
      } 
      const newQuantity = parseInt(oldQuantity) - 1
      const newPrice = (parseInt(newData[unitIndex].item.product_price) / parseInt(oldQuantity)) * parseInt(newQuantity)
      newData[unitIndex].item.product_price = newPrice
      newData[unitIndex].item.quantity = newQuantity
      setData(newData)
      calculateMultipleSubTotal(newData)
    }
  }

  const handleItemDecrement = async (order_id) => {
    try{
    const incrementResponse = await axios.patch(`${BASE_URL}decreament-item/${order_id}/`, {}, {
      headers: {
        "content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if (incrementResponse.status === 200){
      handleDecreaseQuantity(order_id)
    }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnContinue = async () => {
    if(await itemConfirmation()){
      setIsItemVerified(false)
      setAddressAdded(true)
    } else {
      console.log("Item confirmation Failed")
    }
  }

  if (!data){
    return null
  }

  return (
    <>
      <div className="row w-100 h-75 checkout-verify-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Thumbnail</th>
              <th style={{ width: "30%" }}>Product</th>
              <th style={{ width: "17%" }}>Price</th>
              <th style={{ width: "13%" }}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      style={{ width: "100px", height: "auto" }}
                      src={item.item.product.thumbnail}
                      alt={`${item.item.product.brand} ${item.item.product.name} ${item.item.product_variant.variation} ${item.item.product_color.color}`}
                    />
                  </td>
                  <td>
                    <h5>{`${item.item.product.brand} ${item.item.product.name} ${item.item.product_variant.variation} ${item.item.product_color.color}`}</h5>
                  </td>
                  <td>
                    <h5>{formatAmountWithRupeeSymbol(item.item.product_price)}</h5>
                  </td>
                  <td className="quantity-cell">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-outline-dark btn-sm mr-2"
                        onClick={() => handleItemDecrement(item.order_id)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        className="form-control"
                        readOnly
                        name="subtotal"
                        value={item.item.quantity}
                      />
                      <button
                        className="btn btn-outline-dark btn-sm ml-2"
                        onClick={() => handleItemIncrement(item.order_id)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : data ? (
              <tr>
                <td>
                  <img
                    style={{ width: "100px", height: "auto" }}
                    src={data.item.product.thumbnail}
                    alt={`${data.item.product.brand} ${data.item.product.name} ${data.item.product_variant.variation} ${data.item.product_color.color}`}
                  />
                </td>
                <td>
                  <h5>{`${data.item.product.brand} ${data.item.product.name} ${data.item.product_variant.variation} ${data.item.product_color.color}`}</h5>
                </td>
                <td>
                  <h5>{formatAmountWithRupeeSymbol(data.item.product_price)}</h5>
                </td>
                <td className="quantity-cell">
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-outline-dark btn-sm mr-2"
                      onClick={() => handleItemDecrement(data.order_id)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      className="form-control"
                      readOnly
                      name="subtotal"
                      value={data.item.quantity}
                    />
                    <button
                      className="btn btn-outline-dark btn-sm ml-2"
                      onClick={() => handleItemIncrement(data.order_id)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No items to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="row w-100 h-25">
        <div className="col-lg-6">
          <h4>Subtotal:</h4>
          <h1>{formatAmountWithRupeeSymbol(subtotal)}</h1>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-end">
          <button className="btn btn-warning" onClick={handleOnContinue}>Continue</button>
        </div>
      </div>
    </>
  );
};

export default CheckoutVerify;
