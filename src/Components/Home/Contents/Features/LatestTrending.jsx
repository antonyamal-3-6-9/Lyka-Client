import axios from "axios";
import React, { useEffect, useState } from "react";
import Trending from "./Trending";
import Latest from "./Latest";

const BASE_URL = "http://127.0.0.1:8000/product/demand/";

export default function LatestTrending({}) {
  const [latestUnits, setLatestUnits] = useState([]);
  const [trendingUnits, setTrendingUnits] = useState([]);

  const fetchLatest = async () => {
    try {
      const latestProductResponse = await axios.get(`${BASE_URL}latest/`);
      setLatestUnits(latestProductResponse.data);
    } catch (error) {
      alert("Error fetching data");
    }
  };

  const fetchTrending = async () => {
    try {
      const trendingProductResponse = await axios.get(`${BASE_URL}trending/`);
      setTrendingUnits(trendingProductResponse.data);
    } catch (error) {
      alert("Error fetching trending");
    }
  };

  useEffect(() => {
    fetchLatest();
    fetchTrending();
  }, []);

  return (
    <>
      <div className="row" style={{height: "500px"}}>
        <Latest latestUnits={latestUnits} />
        <Trending trendingUnits={trendingUnits} />
      </div>
    </>
  );
}
