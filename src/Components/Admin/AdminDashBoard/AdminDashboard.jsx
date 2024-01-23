import React, { useEffect, useState } from "react";
import { Line, Pie, PolarArea } from "react-chartjs-2";
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
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Paper, styled } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress, Button } from "@mui/material";
import CommissionReport from "./AdminCommissionReport";
import Commissions from "./AdminCommissionList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AdminDashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("days");

  const [loading, setLoading] = useState(false);

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const BASE_URL = "http://127.0.0.1:8000/lyka-admin/";
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
      return formattedDates;
    } else if (timeframe === "weeks") {
      const numOfWeeks = 9;
      const previousAndNextWeeks = getWeekStartAndEndDates(numOfWeeks);
      return previousAndNextWeeks;
    } else if (timeframe === "months") {
      const rq_months = getAllYearsAndMonths(9);
      return rq_months;
    } else if (timeframe === "years") {
      const years = getCurrentAndPreviousYears(4);
      return years;
    }
  };

  const sliceEarningsData = (earnings, isMonth) => {
    const values = Object.values(earnings);
    let keys = null;
    if (isMonth) {
      keys = getAllYearsAndMonthsString(9);
    } else {
      keys = Object.keys(earnings);
    }
    for (let i = 0; i < values.length; i++) {
      if (values[i] > 0 || i === values.length - 1) {
        return [values.splice(i), keys.splice(i)];
      }
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const sales = await axios.post(
        `${BASE_URL}commissions/days/`,
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
      setLoading(false);
      console.log(sales.data)
      return sales.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchWeeksData = async () => {
    try {
      setLoading(true);
      const weekSales = await axios.post(
        `${BASE_URL}commissions/weeks/`,
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
      setLoading(false);
      return weekSales.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchMonthsData = async () => {
    try {
      setLoading(true);
      const monthsData = await axios.post(
        `${BASE_URL}commissions/months/`,
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
      setLoading(false);
      return monthsData.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchYearsData = async () => {
    try {
      setLoading(true);
      const yearSales = await axios.post(
        `${BASE_URL}commissions/years/`,
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
      console.log(yearSales);
      setLoading(false);
      return yearSales.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const gettingSales = async () => {
      if (selectedTimeframe === "days") {
        const sales = await fetchData();
        const [earnings, labels] = sliceEarningsData(sales, false);
        setLabels(labels);
        setEarningsData(earnings);
      } else if (selectedTimeframe === "weeks") {
        const weeksales = await fetchWeeksData();
        const [earnings, labels] = sliceEarningsData(weeksales, false);
        setLabels(labels);
        setEarningsData(earnings);
      } else if (selectedTimeframe === "months") {
        const monthSales = await fetchMonthsData();
        const [earnings, labels] = sliceEarningsData(monthSales, false);
        setLabels(labels);
        setEarningsData(earnings);
      } else if (selectedTimeframe === "years") {
        const yearsSales = await fetchYearsData();
        const [earnings, labels] = sliceEarningsData(yearsSales, false);
        setLabels(labels);
        setEarningsData(earnings);
      }
    };
    gettingSales();
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

    for (let i = numOfWeeks; i >= 1; i--) {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - (weekStartOffset + 7 * i));
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      dates.push(
        `${formatWeekDate(weekStartDate)} - ${formatWeekDate(weekEndDate)}`
      );
    }

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
    return monthsAndYears.reverse();
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
    for (let i = numOfYears; i >= 0; i--) {
      const previousYear = currentYear - i;
      years.push(previousYear);
    }

    return years;
  }

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = (alpha) => {
  return `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${alpha})`;
};

const createRandomColorArrays = () => {
  const borderColor = Array.from({ length: 9 }, () => getRandomColor(1));
  const backgroundColor = Array.from({ length: 9 }, () => getRandomColor(0.2));

  return { borderColor, backgroundColor };
};

const { borderColor, backgroundColor } = createRandomColorArrays();

  const earningsChartData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings",
        data: earningsData,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        pointBackgroundColor: "black",
        pointBorderColor: "white",
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
        <CircularProgress />
      </Backdrop>
      <Item>
        <h3 className="text-dark text-center h3">Dashboard</h3>
        <div className="d-flex justify-content-center mb-3">
          <Button
            style={{
              color: selectedTimeframe === "days" ? "black" : "#3E3232",
            }}
            onClick={() => handleTimeframeChange("days")}
          >
            Day
          </Button>

          <Button
            style={{
              color: selectedTimeframe === "weeks" ? "black" : "#3E3232",
            }}
            onClick={() => handleTimeframeChange("weeks")}
          >
            Week
          </Button>
          <Button
            style={{
              color: selectedTimeframe === "months" ? "black" : "#3E3232",
            }}
            onClick={() => handleTimeframeChange("months")}
          >
            Month
          </Button>
          <Button
            style={{
              color: selectedTimeframe === "years" ? "black" : "#3E3232",
            }}
            onClick={() => handleTimeframeChange("years")}
          >
            Year
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-4">
             <CommissionReport/>
          </div>
          <div className="col-lg-8">
            <Line data={earningsChartData} options={earningsChartOptions} />
          </div>
          <div className="col-lg-6">
            <Pie data={earningsChartData} options={earningsChartOptions} />
          </div>
          <div className="col-lg-6">
            <PolarArea
              data={earningsChartData}
              options={earningsChartOptions}
            />
          </div>
          <div className="col-lg-12 mt-4">
            <Commissions/>
          </div>
        </div>
      </Item>
    </>
  );
};

export default AdminDashboard;
