import axios from "axios";
import React, { useEffect, useState } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/payments/seller/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(`${BASE_URL}get-sales/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(salesResponse);
        setSales(salesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  if (!sales) {
    return null;
  }

  function convertISOToReadable(isoDateString) {
    const date = new Date(isoDateString);
  
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    };
  
    return date.toLocaleString("en-US", options);
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
      <div className="card p-3 mt-3">
        <h2 className="text-center m-3">Sales</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Ref no</th>
              <th>Date and Time</th>
              <th>Order No</th>
              <th>Amount</th>
              <th>Profit</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr>
                <td>{sale.ref_no}</td>
                <td>{convertISOToReadable(sale.time)}</td>
                <td>{sale.order}</td>
                <td>{formatAmountWithRupeeSymbol(sale.amount)}</td>
                <td>{formatAmountWithRupeeSymbol(sale.profit)}</td>
                <td>{sale.entry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Sales;
