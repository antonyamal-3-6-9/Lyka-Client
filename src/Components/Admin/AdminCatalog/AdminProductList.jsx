import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://127.0.0.1:8000/product/lyka-admin/";

  const [openAddProduct, setOpenAddProduct] = useState(false);

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
        console.log(productResponse.data);
        setProducts(productResponse.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!products) {
    return null;
  }

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <h4 className="h5 text-dark text-center">Products</h4>
      <div className="d-flex">
        <Button>
          <Link to="/admin/add/product/" style={{ color: "#294B29" }}>
            Add New Product
          </Link>
        </Button>
      </div>
      {products.length !== 0 ? (
        <div className="row">
          {products.map((product) => (
            <div
              className="col-lg-6 col-md-12 col-xs-12"
              key={product.productId}
            >
              <div className="card m-2" style={{ height: "50vh" }}>
                <div className="row p-3">
                  <div className="col-lg-4">
                    <img
                      src={`http://127.0.0.1:8000${product.thumbnail}`}
                      width="150px"
                    />
                  </div>
                  <div className="col-lg-8">
                    <div>
                      <h5 className="h5 text-dark">
                        {product.brand} {product.name}
                      </h5>
                    </div>
                    <div className="d-flex justify-content-start">
                      <div className="me-5">
                        <h6 className="h6 text-dark">Variants</h6>
                        {product.variations.map((variant) => (
                          <p key={variant.id} className="text-dark m-0 p-0">
                            {variant.variation}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h6 className="h6 text-dark">Colors</h6>
                        {product.colors.map((color) => (
                          <p key={color.id} className="text-dark m-0 p-0">
                            {color.color}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h6 className="h6 text-dark mt-2">Category</h6>
                      <p className="text-dark">
                        {product.root_category.name}/
                        {product.main_category.name}/{product.sub_category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex p-5 m-5">
          <h4 className="h4 text-dark text-center">No Products found</h4>
        </div>
      )}
    </>
  );
};

export default AdminProductList;
