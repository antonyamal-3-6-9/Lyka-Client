import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Paper, styled } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const SalesChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("days");

  const [loading, setLoading] = useState(false)

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const BASE_URL = "http://127.0.0.1:8000/payments/seller/";
  const token = localStorage.getItem("token");
  const [earningsData, setEarningsData] = useState([]);
  const [labels, setLabels] = useState([]);

  const getLabelsBasedOnTimeframe = (timeframe) => {
    if (timeframe === "days") {
      const numOfDays = 9;
      const previousAndNextDates = getPreviousNextDates(numOfDays);
      const formattedDates = previousAndNextDates.map((date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      });
      setLabels(formattedDates)
      return formattedDates;
    } else if (timeframe === "weeks") {
      const numOfWeeks = 9;
      const previousAndNextWeeks = getWeekStartAndEndDates(numOfWeeks);
      setLabels(previousAndNextWeeks)
      return previousAndNextWeeks;
    } else if (timeframe === "months") {
      const months = getAllYearsAndMonthsString(9)
      setLabels(months)
      const rq_months = getAllYearsAndMonths(9)
      return rq_months;
    } else if (timeframe === "years") {
      const years = getCurrentAndPreviousYears(4);
      setLabels(years)
      return years;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true)
      const sales = await axios.post(
        `${BASE_URL}get-sales/day/`,
        {
          days: getLabelsBasedOnTimeframe(selectedTimeframe),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      return sales.data;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const fetchWeeksData = async () => {
    try {
      setLoading(true)
      const weekSales = await axios.post(
        `${BASE_URL}get-sales/week/`,
        {
          weeks: getLabelsBasedOnTimeframe(selectedTimeframe),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      return weekSales.data;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const fetchMonthsData = async () => {
    try {
      setLoading(true)
      const monthsData = await axios.post(
        `${BASE_URL}get-sales/month/`,
        {
          months: getLabelsBasedOnTimeframe(selectedTimeframe),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      return monthsData.data;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const fetchYearsData = async () => {
    try {
      setLoading(true)
      const yearSales = await axios.post(
        `${BASE_URL}get-sales/year/`,
        {
          years: getLabelsBasedOnTimeframe(selectedTimeframe),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(yearSales)
      setLoading(false)
      return yearSales.data;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    const gettingSales = async () => {
      if (selectedTimeframe === "days") {
        const sales = await fetchData();
        const sales_value = Object.values(sales)
        setEarningsData(sales_value);
      } else if (selectedTimeframe === "weeks") {
        const weeksales = await fetchWeeksData();
        const sales_value =Object.values(weeksales)
        setEarningsData(sales_value)
      } else if (selectedTimeframe === 'months') {
        const monthSales = await fetchMonthsData();
        const sales_value = Object.values(monthSales)
        setEarningsData(sales_value)
      } else if (selectedTimeframe === 'years') {
        const yearsSales = await fetchYearsData();
        const sales_value = Object.values(yearsSales)
        setEarningsData(sales_value)
      }
    };
    gettingSales()
  }, [selectedTimeframe]);


  

  if (!earningsData) {
    return null;
  }

  if (!selectedTimeframe) {
    return null;
  }

  function getPreviousNextDates(numOfDays) {
    const dates = [];
    const currentDate = new Date();
    for (let i = numOfDays; i >= 1; i--) {
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - i);
      dates.push(previousDate);
    }
    dates.push(currentDate);

    return dates;
  }

  function formatWeekDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getWeekStartAndEndDates(numOfWeeks) {
    const dates = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDayOfWeek = currentDate.getDay();
    const weekStartOffset = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Previous weeks
    for (let i = numOfWeeks; i >= 1; i--) {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - (weekStartOffset + 7 * i));
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      dates.push(
        `${formatWeekDate(weekStartDate)} - ${formatWeekDate(weekEndDate)}`
      );
    }

    // Current week
    const currentWeekStartDate = new Date(currentDate);
    currentWeekStartDate.setDate(currentDate.getDate() - weekStartOffset);
    const currentWeekEndDate = new Date(currentWeekStartDate);
    currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);
    dates.push(
      `${formatWeekDate(currentWeekStartDate)} - ${formatWeekDate(
        currentWeekEndDate
      )}`
    );

    return dates;
  }

  function getAllYearsAndMonthsString(numOfMonths) {
    const monthsAndYears = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
  
    for (let i = 0; i <= numOfMonths; i++) {
      const year = currentYear + Math.floor((currentMonth - 1 - i) / 12);
      const month = ((currentMonth - 1 - i + 12) % 12) + 1;
  
  
      const formattedDate = `${year}-${String(month).padStart(2, "0")}`;
      monthsAndYears.push(formattedDate);
    }
    return monthsAndYears.reverse()
  }
  
  
  

  function getAllYearsAndMonths(numOfMonths) {
    const yearsAndMonths = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    for (let i = 0; i <= numOfMonths; i++) {
      const year = currentYear + Math.floor((currentMonth - 1 - i) / 12);
      const month = ((currentMonth - 1 - i + 12) % 12) + 1;

      yearsAndMonths.push({ year, month });
    }
    return yearsAndMonths.reverse();
  }

  function getCurrentAndPreviousYears(numOfYears) {
    const years = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Get the previous years in ascending order
    for (let i = numOfYears; i >= 0; i--) {
      const previousYear = currentYear - i;
      years.push(previousYear);
    }

    return years;
  }

  const earningsChartData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings",
        data: earningsData,
        borderColor: "green",
        backgroundColor: "yellow)",
        pointBackgroundColor: "red",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "blue",
      },
    ],
  };

  const earningsChartOptions = {
    scales: {
      x: {
        type: "category",
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: true,
      position: "bottom",
    },
  };


  return (
    <>
    <Backdrop open={loading}>
      <CircularProgress/>
    </Backdrop>
        <Item>
          <h3>Earnings Trends</h3>
          <div className="d-flex justify-content-center mb-3">
            <button
              className={`btn btn-sm btn-primary mr-2 ${
                selectedTimeframe === "day" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("days")}
            >
              Day
            </button>
            <button
              className={`btn btn-sm btn-primary mr-2 ${
                selectedTimeframe === "week" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("weeks")}
            >
              Week
            </button>
            <button
              className={`btn btn-sm btn-primary mr-2 ${
                selectedTimeframe === "months" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("months")}
            >
              Month
            </button>
            <button
              className={`btn btn-sm btn-primary ${
                selectedTimeframe === "years" ? "active" : ""
              }`}
              onClick={() => handleTimeframeChange("years")}
            >
              Year
            </button>
          </div>
          <Line data={earningsChartData} options={earningsChartOptions} />
          </Item>
    </>
  );
};

export default SalesChart;
