import React, { useState } from "react";
import ProductListMenu from "./AdminProductMenu";
import { Button, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

const Products = ({
  products,
  setProducts,
  filterData,
  setFilterData,
  initiateFilter,
  initiateSort,
  revert,
  searchData,
  setSearchData,
  initiateSearch,
}) => {
  const BASE_URL = "http://127.0.0.1:8000/product/lyka-admin/";

  const [variation, setVariation] = useState();
  const [color, setColor] = useState();

  const handleVariationAdd = async (productId, index) => {
    const token = localStorage.getItem("token");
    try {
      const variationAddResponse = await axios.post(
        `${BASE_URL}variant/add/`,
        {
          product_id: productId,
          variant: variation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempProducts = [...products];
      tempProducts[index].variations.push(variationAddResponse.data);
      setProducts(tempProducts);
    } catch (error) {
      alert("failed");
    }
  };

  const handleVariationRemove = async (
    productId,
    variantId,
    productIndex,
    variantIndex
  ) => {
    const token = localStorage.getItem("token");
    try {
      const variationRemoveResponse = await axios.post(
        `${BASE_URL}variant/remove/`,
        {
          product_id: productId,
          variant_id: variantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempProducts = [...products];
      tempProducts[productIndex].variations.splice(variantIndex, 1);
      setProducts(tempProducts);
    } catch (error) {
      alert("Error removing variant");
    }
  };

  const handleColorAdd = async (productId, index) => {
    const token = localStorage.getItem("token");
    try {
      const colorAddResponse = await axios.post(
        `${BASE_URL}color/add/`,
        {
          product_id: productId,
          color: color,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempProducts = [...products];
      tempProducts[index].colors.push(colorAddResponse.data);
      setProducts(tempProducts);
    } catch (error) {
      alert("error adding color");
    }
  };

  const handleColorRemove = async (
    productId,
    colorId,
    productIndex,
    colorIndex
  ) => {
    const token = localStorage.getItem("token");
    try {
      const colorRemoveResponse = await axios.post(
        `${BASE_URL}color/remove/`,
        {
          product_id: productId,
          color_id: colorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempProducts = [...products];
      tempProducts[productIndex].colors.splice(colorIndex, 1);
      setProducts(tempProducts);
    } catch (error) {
      alert("couldn't remove color");
    }
  };

  const handleProductsDelete = async (productId, index) => {
    const token = localStorage.getItem("token");
    try {
      const productDeleteResponse = await axios.delete(
        `${BASE_URL}delete/${productId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let tempProducts = [...products];
      tempProducts.splice(index, 1);
      setProducts(tempProducts);
    } catch (error) {
      alert("cannot delete product");
    }
  };

  return (
    <>
      <h4 className="h5 text-dark text-center">Products</h4>
      <div className="row">
        <ProductListMenu
          revert={revert}
          filterData={filterData}
          setFilterData={setFilterData}
          initiateFilter={initiateFilter}
          initiateSort={initiateSort}
          searchData={searchData}
          setSearchData={setSearchData}
          initiateSearch={initiateSearch}
        />
        <div className="d-flex">
          <Button>
            <Link
              to="/admin/add/product/"
              style={{
                color: "#294B29",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              Add New Product
            </Link>
          </Button>
        </div>
        {products.length !== 0 ? (
          products.map((product) => (
            <div
              className="col-lg-6 col-md-12 col-xs-12"
              key={product.productId}
            >
              <div
                style={{
                  border: "1px solid #50623A",
                  marginBottom: "40px",
                  padding: "20px",
                }}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div>
                      <img
                        src={`http://127.0.0.1:8000${product.thumbnail}`}
                        width="150px"
                      />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="d-flex justify-content-between">
                      <h5 className="h5 text-dark">
                        {product.brand} {product.name}
                      </h5>
                      <IconButton
                        onClick={() => handleProductsDelete(product.productId)}
                      >
                        <DeleteForeverIcon
                          style={{
                            color: "#294B29",
                          }}
                        />
                      </IconButton>
                    </div>

                    <div className="mb-2">
                      <h6 className=" text-dark mt-2">Category</h6>
                      <p className="h6 text-dark">
                        {product.root_category.name}/
                        {product.main_category.name}/{product.sub_category.name}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <div className="me-5">
                        <h6 className=" text-dark">weight</h6>
                        <p className=" h6 text-dark">{product.weight} g</p>
                      </div>
                      <div>
                        <h6 className=" text-dark">Added On</h6>
                        <p className=" h6 text-dark">{product.added_on}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-3 d-flex justify-content-evenly">
                      <div className="col-lg-6 d-flex flex-column align-items-start">
                        <h6 className="text-dark text-center">Variants</h6>
                        <div className="d-flex flex-column">
                          {product.variations.map((variant) => (
                            <div className="d-flex justify-content-center align-items-center">
                              <p
                                key={variant.id}
                                className="text-dark h6 m-0 mb-2 p-0"
                              >
                                {variant.variation}
                              </p>
                              <IconButton>
                                <DeleteForeverIcon
                                  style={{
                                    fontSize: "1rem",
                                    marginBottom: "10px",
                                  }}
                                />
                              </IconButton>
                            </div>
                          ))}
                        </div>
                        <Button
                          style={{
                            color: "#294B29",
                          }}
                          startIcon={<AddIcon />}
                        >
                          Variant
                        </Button>
                      </div>
                      <div className="col-lg-6 d-flex flex-column align-items-start">
                        <h6 className="text-dark text-center">Colors</h6>
                        <div className="d-flex flex-column">
                          {product.colors.map((color) => (
                            <div className="d-flex justify-content-center align-items-center">
                              <p
                                key={color.id}
                                className="text-dark h6 mb-2 m-0 p-0"
                              >
                                {color.color}
                              </p>
                              <IconButton>
                                <DeleteForeverIcon
                                  style={{
                                    fontSize: "1rem",
                                    marginBottom: "10px",
                                  }}
                                />
                              </IconButton>
                            </div>
                          ))}
                        </div>
                        <Button
                          style={{
                            color: "#294B29",
                          }}
                          startIcon={<AddIcon />}
                        >
                          Color
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex p-5 m-5">
            <h4 className="h4 text-dark text-center">No Products found</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
