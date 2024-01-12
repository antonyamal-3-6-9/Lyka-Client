import React, {useState} from "react";
import FloatingAlert from "../FloatingAlert/FloatingAlert";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const CheckoutVerify = ({ data, setData, isSingle, setIsItemVerified, calculateMultipleSubTotal, calculateSingleSubTotal, subtotal, setAddressAdded, BASE_URL, itemConfirmation }) => {


  const [alertData, setAlertData] = useState('')
  const [alertEnable, setAlertEnable] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")

  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
    const incrementResponse = await axios.patch(`${BASE_URL}increament-item/${order_id}/`, {}, {
      headers: {
        "content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if (incrementResponse.status === 200){
      handleIncreaseQuantity(order_id)
      setIsLoading(false)
    }
    } catch (error) {
      setAlertData(error.response.data.message)
      setAlertEnable(true)
      setAlertSeverity("error")
      setIsLoading(false)
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
      setIsLoading(true)
    const incrementResponse = await axios.patch(`${BASE_URL}decreament-item/${order_id}/`, {}, {
      headers: {
        "content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if (incrementResponse.status === 200){
      handleDecreaseQuantity(order_id)
      setIsLoading(false)
    }
    } catch (error) {
      setAlertData(error.response.data.message)
      setAlertEnable(true)
      setAlertSeverity("error")
      setIsLoading(false)
    }
  }

  const handleOnContinue = async () => {
    setIsLoading(true)
    if(await itemConfirmation()){
      setIsItemVerified(false)
      setAddressAdded(true)
      setIsLoading(false)
    } else {
      setAlertData("Confirmation failed")
      setAlertEnable(true)
      setAlertSeverity("error")
    }
  }

  if (!data){
    return null
  }

  return (
    <>
    <FloatingAlert 
      message={alertData}
      enable={alertEnable}
      setEnable={setAlertEnable}
      severity={alertSeverity}
    />
    <Backdrop
      open={isLoading}
    >
      <CircularProgress/>
    </Backdrop>
      <div className="row w-100 checkout-verify-container">
        <table className="table table-hover table-responsive">
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
                      src={`http://127.0.0.1:8000${item.item.product.thumbnail}`}
                      alt={`${item.item.product.brand} ${item.item.product.name} ${item.item.product_variant.variation} ${item.item.product_color.color}`}
                    />
                  </td>
                  <td>
                    <h5 className="h5">{`${item.item.product.brand} ${item.item.product.name} ${item.item.product_variant.variation} ${item.item.product_color.color}`}</h5>
                  </td>
                  <td>
                    <h5 className="h5">{formatAmountWithRupeeSymbol(item.item.product_price)}</h5>
                  </td>
                  <td className="quantity-cell">
                    <div className="d-flex justify-content-center align-items-center">
                      <IconButton
                        onClick={() => handleItemDecrement(item.order_id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                        <h5 className="h5">{item.item.quantity}</h5>
                      <IconButton
                        onClick={() => handleItemIncrement(item.order_id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : data ? (
              <tr>
                <td>
                  <img
                    style={{ width: "100px", height: "auto" }}
                    src={`http://127.0.0.1:8000${data.item.product.thumbnail}`}
                    alt={`${data.item.product.brand} ${data.item.product.name} ${data.item.product_variant.variation} ${data.item.product_color.color}`}
                  />
                </td>
                <td>
                  <h5 className="h5" >{`${data.item.product.brand} ${data.item.product.name} ${data.item.product_variant.variation} ${data.item.product_color.color}`}</h5>
                </td>
                <td>
                  <h5 className="h5" >{formatAmountWithRupeeSymbol(data.item.product_price)}</h5>
                </td>
                <td className="quantity-cell">
                  <div className="d-flex justify-content-center align-items-center">
                    <IconButton
                      onClick={() => handleItemDecrement(data.order_id)}
                    >
                      <AddIcon/>
                    </IconButton>
                      <h5 className="h5">{data.item.quantity}</h5>
                    <IconButton
                      onClick={() => handleItemIncrement(data.order_id)}
                    >
                      <RemoveIcon />
                    </IconButton>
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
          <h4 className="h6">Subtotal:</h4>
          <h1 className="h1">{formatAmountWithRupeeSymbol(subtotal)}</h1>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-end">
          <Button  onClick={handleOnContinue} variant="contained" endIcon={<ArrowRight />} style={{ backgroundColor: "#16213E"}}>Continue</Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutVerify;
