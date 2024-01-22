import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const CommissionReport = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000/lyka-admin/";
  const [salesReport, setSalesReport] = useState({});
  const [timeLineData, setTimeLineData] = useState({
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const salesReportResponse = await axios.get(
          `${BASE_URL}commission/report/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(salesReportResponse.data);
        setSalesReport(salesReportResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
      setLoading(true);
      const salesReportTimeLineResponse = await axios.post(
        `${BASE_URL}commission/report/timeline/`,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
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
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: "#3E3232" }}
            >
              Get
            </Button>
          </div>
        </form>
      </div>

      <h5 className="h6 text-dark">Total No of Commissions:</h5>
      <h3 className="h4 mb-3 text-dark">
        {salesReport.total_no ? salesReport.total_no : 0}
      </h3>

      <h4 className="h6 text-dark">Total Gain:</h4>
      <h3 className="h4 mb-2 text-dark">
        {salesReport.income
          ? formatAmountWithRupeeSymbol(salesReport.income)
          : 0}
      </h3>
    </>
  );
};

export default CommissionReport;
