import axios from "axios";
import React, { useEffect, useState } from "react";

const SalesReport = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/payments/seller/";
  const [salesReport, setSalesReport] = useState({});
  const [timeLineData, setTimeLineData] = useState({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesReportResponse = await axios.get(
          `${BASE_URL}get-sales-report/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(salesReportResponse.data);
        setSalesReport(salesReportResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  if (!salesReport) {
    return null;
  }

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const salesReportTimeLineResponse = await axios.post(
        `${BASE_URL}get-sales-report/time-line/`,
        {
          start_date: timeLineData.start_date,
          end_date: timeLineData.end_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalesReport(salesReportTimeLineResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTimeLineData({ ...timeLineData, [e.target.name]: e.target.value });
  };

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
      <div className="card p-3 mt-5 p-3 m-3">
        <div className="row">
          <form onSubmit={handleReportSubmit}>
            <div className="col-lg-6">
              <label>From</label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                onChange={handleChange}
                value={timeLineData.start_date}
                required
              />
            </div>
            <div className="col-lg-6">
              <label>To</label>
              <input
                type="date"
                name="end_date"
                className="form-control"
                onChange={handleChange}
                value={timeLineData.end_date}
                required
              />
            </div>
            <div className="col-lg-12">
              <button className="btn btn-success">Get</button>
            </div>
          </form>
        </div>
      </div>
      <div className="card p-3 m-3">
        <h4>Total Sales</h4>
        <h3 className="h-3">{salesReport.total_sales}</h3>
      </div>
      <div className="card p-3 m-3">
        <h4>Total Products Sold</h4>
        <h3 className="h-3">{salesReport.total_products_sold}</h3>
      </div>
      <div className="card p-3 m-3">
        <h4>Total Gain</h4>
        <h3 className="h-3">{formatAmountWithRupeeSymbol(salesReport.total_amount)}</h3>
      </div>
      <div className="card p-3 m-3">
        <h4>Total Profit</h4>
        <h3 className="h-3">{formatAmountWithRupeeSymbol(salesReport.total_profit)}</h3>
      </div>
    </>
  );
};

export default SalesReport;
