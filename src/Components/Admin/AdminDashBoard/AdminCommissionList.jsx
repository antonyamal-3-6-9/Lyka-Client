import axios from "axios";
import React, { useEffect, useState } from "react";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";


const Commissions = () => {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/lyka-admin/";

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const salesResponse = await axios.get(`${BASE_URL}commission/retrieve/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(salesResponse);
        setSales(salesResponse.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
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
    <Backdrop open={loading}>
      <CircularProgress/>
    </Backdrop>
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
              <tr key={sale.ref_no}>
                <td className="text-dark">{sale.ref_no}</td>
                <td className="text-dark">{convertISOToReadable(sale.time)}</td>
                <td className="text-dark">{formatAmountWithRupeeSymbol(sale.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
};

export default Commissions;
