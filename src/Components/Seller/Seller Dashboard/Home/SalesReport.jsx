import axios from "axios";
import React, { useEffect, useState } from "react";
import { Paper, styled, Button, TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

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
      return 0;
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
      <Item>
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
              <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
                Get
              </Button>
            </div>
          </form>
        </div>

        <h5 className="h6 text-dark">Total Sales:</h5>
        <h3 className="h4 mb-3 text-dark">{salesReport.total_sales ? salesReport.total_sales : 0}</h3>

        <h4 className="h6 text-dark">Total Products Sold:</h4>
        <h3 className="h4 text-dark mb-3">{salesReport.total_products_sold ? salesReport.total_products_sold : 0}</h3>

        <h4 className="h6 text-dark">Total Gain:</h4>
        <h3 className="h4 mb-2 text-dark">
          {salesReport.total_amount ? formatAmountWithRupeeSymbol(salesReport.total_amount) : 0}
        </h3>

        <h4 className="h6 text-dark">Total Profit:</h4>
        <h3 className="h4 text-dark mb-2">
          {salesReport.total_profit ? formatAmountWithRupeeSymbol(salesReport.total_profit) : 0}
        </h3>
      </Item>
    </>
  );
};

export default SalesReport;
