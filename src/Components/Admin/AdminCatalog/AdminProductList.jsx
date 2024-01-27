import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import Products from "./Adminproducts";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hasFound, setHasFound] = useState(null);

  const [filterData, setFilterData] = useState({
    rootId: "",
    mainId: "",
    subId: "",
  });
  const [searchData, setSearchData] = useState("");
  const [productBackup, setProductBackup] = useState({
    backup: [],
    active: false,
  });

  const BASE_URL = "http://127.0.0.1:8000/product/lyka-admin/";

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const productResponse = await axios.get(`${BASE_URL}list/all/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (productResponse.status === 200) {
        setProducts(productResponse.data);
        if (productResponse.data.length > 0) {
          setHasFound(true);
        } else {
          setHasFound(false)
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasFound(false);
      alert("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    if (
      filterData.rootId.length <= 10 &&
      filterData.mainId.length <= 10 &&
      filterData.subId.length <= 10
    ) {
      alert("category is a must");
      return;
    }

    let tempProducts = [...products];
    const newProducts = tempProducts.filter((product) => {
      if (
        product.main_category.main_id === filterData.mainId &&
        product.root_category.root_id === filterData.rootId &&
        product.sub_category.sub_id === filterData.subId
      ) {
        return product;
      }
    });
    setProducts(newProducts);
  };

  const handleSort = (option) => {
    let tempProducts = [...products];
    if (option === "alphabetical") {
      tempProducts.sort((productOne, productTwo) =>
        productOne.brand.localeCompare(productTwo.brand)
      );
    } else if (option === "oldest") {
      tempProducts.sort((a, b) => new Date(b.added_on) - new Date(a.added_on));
    }
    setProducts(tempProducts);
  };

  const binarySearch = (data, keyword) => {
    console.log(data);
    let l = 0;
    let r = data.length - 1;
    let m;

    let k = keyword.length;

    while (l <= r) {
      m = Math.floor((r + l) / 2);

      if (data[m].brand.length >= k) {
        console.log(data[m].brand.slice(0, k).toLowerCase());
        if (data[m].brand.slice(0, k).toLowerCase() === keyword.toLowerCase()) {
          return data[m];
        }
      }

      console.log(data[m].brand.localeCompare(keyword));
      if (data[m].brand.localeCompare(keyword) < 0) {
        l = m + 1;
        console.log(l);
      } else {
        console.log(r);
        r = m - 1;
      }
    }

    return -1;
  };

  const handleSearch = () => {
    if (searchData.length <= 0) {
      alert("more length");
      return;
    }

    let tempProducts = null;
    if (productBackup.active) {
      tempProducts = [...productBackup.backup];
    } else {
      tempProducts = [...products];
    }

    tempProducts.sort((productOne, productTwo) =>
      productOne.brand.localeCompare(productTwo.brand)
    );

    const result = binarySearch(tempProducts, searchData);
    if (result !== -1) {
      if (!productBackup.active) {
        setProductBackup({
          ...productBackup,
          active: true,
          backup: [...products],
        });
      }
      setProducts([result]);
    }
  };

  const handleRevert = () => {
    fetchData();
  };

  if (hasFound === null) {
    return null;
  }

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Products
        revert={handleRevert}
        products={products}
        filterData={filterData}
        setFilterData={setFilterData}
        initiateFilter={handleFilter}
        initiateSort={handleSort}
        searchData={searchData}
        setSearchData={setSearchData}
        initiateSearch={handleSearch}
        hasFound={hasFound}
        setProducts={setProducts}
      />
    </>
  );
};

export default AdminProductList;
