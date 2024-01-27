import React, { useState } from "react";
import ProductListMenu from "./AdminProductMenu";
import { Button, Divider, IconButton, styled, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import ProductActionModal from "./ProductActionModal";
import VarColDeleteModal from "./VarColDelete";
import VarColAddModal from "./VarColAdd";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
}));

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
  hasFound,
}) => {
  const BASE_URL = "http://127.0.0.1:8000/product/lyka-admin/";

  const [varColAdd, setVarColAdd] = useState(false);

  const [varColAddData, setVarColAddData] = useState({
    productId: "",
    productIndex: "",
    xData: "",
    x: "",
  });

  const [productDeleteData, setProductDeleteData] = useState({
    id: "",
    index: "",
  });

  const [openProductDelete, setOpenProductDelete] = useState(false);
  const [openVarColDelete, setOpenVarColDelete] = useState(false);

  const [varColDeleteData, setVarColDeleteData] = useState({
    productId: "",
    xId: "",
    productIndex: "",
    xIndex: "",
    x: "",
  });

  const handleVariationAdd = async (productId, index, variation) => {
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
      setVarColAdd(false)
    } catch (error) {
      alert("failed");
    }
  };

  const handleVariationRemove = async (
    productId,
    productIndex,
    variantId,
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
      setOpenVarColDelete(false);
      let tempProducts = [...products];
      tempProducts[productIndex].variations.splice(variantIndex, 1);
      setProducts(tempProducts);
    } catch (error) {
      alert("Error removing variant");
      console.log(error)
    }
  };

  const handleColorAdd = async (productId, index, color) => {
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
      setVarColAdd(false);
    } catch (error) {
      alert("error adding color");
    }
  };

  const handleColorRemove = async (
    productId,
    productIndex,
    colorId,
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
      setOpenVarColDelete(false);
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
      setOpenProductDelete(false);
    } catch (error) {
      alert("cannot delete product");
    }
  };

  const initiateProductDelete = (id, index) => {
    setProductDeleteData({ ...productDeleteData, id: id, index: index });
    setOpenProductDelete(true);
  };

  const initiateVarColDelete = (productId, productIndex, xId, xIndex, x) => {
    setVarColDeleteData({
      ...varColDeleteData,
      productId: productId,
      productIndex: productIndex,
      xId: xId,
      xIndex: xIndex,
      x: x,
    });
    setOpenVarColDelete(true);
  };

  const initiateVarColAdd = (id, index, x) => {
    setVarColAddData({
      ...varColAddData,
      productId: id,
      productIndex: index,
      x: x,
    });
    setVarColAdd(true);
  };

  if (hasFound === null) {
    return null;
  }

  return (
    <>
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
        {openProductDelete && (
          <ProductActionModal
            open={openProductDelete}
            setOpen={setOpenProductDelete}
            productData={productDeleteData}
            initiateDeletion={handleProductsDelete}
          />
        )}
        {openVarColDelete && (
          <VarColDeleteModal
            open={openVarColDelete}
            setOpen={setOpenVarColDelete}
            xData={varColDeleteData}
            initiateColor={handleColorRemove}
            initiateVariant={handleVariationRemove}
          />
        )}
        {varColAdd && (
          <VarColAddModal
            open={varColAdd}
            setOpen={setVarColAdd}
            x={varColAddData}
            initiateCAdd={handleColorAdd}
            initiateVAdd={handleVariationAdd}
            setX={setVarColAddData}
          />
        )}
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
        {hasFound ? (
          products.map((product, index) => (
            <div
              className="col-lg-6 col-md-12 col-xs-12"
              key={product.productId}
            >
              <div
                style={{
                  border: "1px solid #789461",
                  borderRadius: "15px",
                  marginBottom: "40px",
                }}
                className="shadow-lg"
              >
                {/* <Item> */}
                  <div className="row p-5">
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
                          onClick={() =>
                            initiateProductDelete(product.productId, index)
                          }
                        >
                          <DeleteForeverIcon
                            style={{
                              color: "#294B29",
                            }}
                          />
                        </IconButton>
                      </div>

                      <div className="d-flex justify-content-start mb-2">
                        <h6 className=" text-dark me-">Category:</h6>
                        <p className="h6 text-dark">
                          {product.root_category.name}/
                          {product.main_category.name}/
                          {product.sub_category.name}
                        </p>
                      </div>

                      <div className="d-flex justify-content-start mb-2">
                        <h6 className=" text-dark me-1">weight:</h6>
                        <p className=" h6 text-dark">{product.weight} g</p>
                      </div>
                      <div className="d-flex justify-content-start mb-2">
                        <h6 className="me-1 text-dark">Added On:</h6>
                        <p className=" h6 text-dark">{product.added_on}</p>
                      </div>
                      <div className="col-lg-12">
                        <div className="row mt-3 d-flex justify-content-evenly">
                          <div className="col-lg-6 d-flex flex-column align-items-start">
                            <h6 className="text-dark text-center">Variants</h6>
                            <div className="d-flex flex-column">
                              {product.variations.map((variant, vIndex) => (
                                <div className="d-flex justify-content-center align-items-center">
                                  <p
                                    key={variant.id}
                                    className="text-dark h6 m-0 mb-2 p-0"
                                  >
                                    {variant.variation}
                                  </p>
                                  <IconButton
                                    onClick={() => {
                                      initiateVarColDelete(
                                        product.productId,
                                        index,
                                        variant.id,
                                        vIndex,
                                        "V"
                                      );
                                    }}
                                  >
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
                              onClick={() => {initiateVarColAdd(product.productId, index, "Variant")}}
                            >
                              Variant
                            </Button>
                          </div>
                          <div className="col-lg-6 d-flex flex-column align-items-start">
                            <h6 className="text-dark text-center">Colors</h6>
                            <div className="d-flex flex-column">
                              {product.colors.map((color, cIndex) => (
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
                                      onClick={() => {
                                        initiateVarColDelete(
                                          product.productId,
                                          index,
                                          color.id,
                                          cIndex,
                                          "C"
                                        );
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
                              onClick={() => {initiateVarColAdd(product.productId, index, "Color")}}
                            >
                              Color
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                {/* </Item> */}
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 d-flex justify-content-center align-items-center">
            <h6>Product Not Found</h6>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
