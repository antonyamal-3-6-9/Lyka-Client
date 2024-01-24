import React from "react";
import ProductListMenu from "./AdminProductMenu";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Products = ({
  products,
  filterData,
  setFilterData,
  initiateFilter,
  initiateSort,
  revert,
  searchData,
  setSearchData,
  initiateSearch
}) => {
  return (
    <><h4 className="h5 text-dark text-center">Products</h4>
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
            <Link to="/admin/add/product/" style={{ color: "#294B29", marginBottom: "20px", marginTop: "20px" }}>
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
                  padding: "20px"
                }}
              >
                <div className="row">
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
                    <div className="d-flex justify-content-start mt-2">
                      <div className="me-5">
                        <h6 className="h6 text-dark">Added On</h6>
                        <p className="text-dark">{product.added_on}</p>
                      </div>
                      <div>
                        <h6 className="h6 text-dark">weight</h6>
                        <p className="text-dark">{product.weight} gram</p>
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
