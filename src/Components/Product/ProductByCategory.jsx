import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductNav from "./ProductNav";
import axios from "axios";
import "./product.scss";
import { useParams } from "react-router-dom";

const ProductByCategory = () => {
  const BASE_URL = "http://127.0.0.1:8000/product/";

  const [products, setProducts] = useState([]);
  const { type, name } = useParams();
  const cat_id = localStorage.getItem("cat_id");

  const checkThumbnail = (response) => {
    for (let i = 0; i < response.length; i++) {
      if (response[i].product.thumbnail.indexOf("http://") === -1) {
        const newString = "http://127.0.0.1:8000/";
        response[i].product.thumbnail =
          newString + response[i].product.thumbnail;
      }
    }
    return true;
  };

  const fetchAll = async () => {
    try {
      const productsResponse = await axios.get(`${BASE_URL}get-all-items/`);
      if (productsResponse.status === 200) {
        setProducts(productsResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoot = async (rootId) => {
    try {
      const productsResponse = await axios.get(
        `${BASE_URL}get-items/root/${rootId}/`
      );
      if (productsResponse.status === 200) {
        if (checkThumbnail(productsResponse.data)) {
          setProducts(productsResponse.data);
        }
        setProducts(productsResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMain = async (mainId) => {
    try {
      const productsResponse = await axios.get(
        `${BASE_URL}get-items/main/${mainId}/`
      );
      if (productsResponse.status === 200) {
        if (checkThumbnail(productsResponse.data)) {
          setProducts(productsResponse.data);
        }
        setProducts(productsResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSub = async (subId) => {
    try {
      const productsResponse = await axios.get(
        `${BASE_URL}get-items/sub/${subId}/`
      );
      if (productsResponse.status === 200) {
        if (checkThumbnail(productsResponse.data)) {
          setProducts(productsResponse.data);
        }
        setProducts(productsResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type === undefined && name === undefined) {
      fetchAll();
    } else if (type === "sub") {
      fetchSub(cat_id);
    } else if (type === "root") {
      fetchRoot(cat_id);
    } else if (type === "main") {
      fetchMain(cat_id);
    }
  }, []);

  if (!products) {
    return null;
  }

  return (
    <>
      <ProductNav />
      <div className="container-fluid" id="product-container">
        {products.map((item) => (
          <div className="row m-3">
            <ProductCard
              unit_id={item.unit_id}
              key={item.product.productId}
              name={`${item.product.brand} ${item.product.name}`}
              variant={item.variant.variation}
              color={item.color_code.color}
              description={item.product.description}
              categories={`${item.product.root_category.name}/${item.product.main_category.name}/${item.product.sub_category.name}/`}
              mainCategory={item.product.main_category.name}
              slug={item.slug}
              sellingPrice={item.selling_price}
              offerPrice={item.offer_price}
              stock={item.stock}
              thumbnail={item.product.thumbnail}
              launch={item.product.launch_date}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductByCategory;
