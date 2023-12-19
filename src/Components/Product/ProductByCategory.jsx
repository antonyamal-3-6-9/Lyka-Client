import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductNav from "./ProductNav";
import axios from "axios";

const ProductByCategory = () => {
  const BASE_URL = "http://127.0.0.1:8000/product/";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          `${BASE_URL}get-all-items/`
        );
        if (productsResponse.status === 200) {
          setProducts(productsResponse.data);
          console.log(productsResponse);
          console.log(products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!products) {
    return null;
  }

  return (
    <>
      <div id="product-by-category-container">
        <div className="container-fluid">
          <ProductNav />
          <div className="container">
            {products.map((item) => (
                <div className="row m-4">
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
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;
