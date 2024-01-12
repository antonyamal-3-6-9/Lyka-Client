import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faCircle } from "@fortawesome/free-solid-svg-icons";
import "./product.scss";

function ProductItem() {
  return (
    <div className="container-fluid bg-primary m-0 p-0">
      <div className="row mt-2 mb-2">
        <div className="product-list">
        <div className="product-content product-wrap clearfix">
                <div className="row">
                  <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="product-image">
                    <img src="" alt="hyy" className="w-75 h-75"/>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="product-deatil">
                          <h5 className="name">
                            <a href="#">
                              item.brand item.name item.variant
                              <span>item.main_category</span>
                            </a>
                          </h5>
                          <p className="price-container">
                            <span>item.price</span>
                          </p>
                          <div className="rating">
                            <label htmlFor="stars-rating-5">
                              <FontAwesomeIcon icon={faStar} />
                            </label>
                            <label htmlFor="stars-rating-4">
                              <FontAwesomeIcon icon={faStar} />
                            </label>
                            <label htmlFor="stars-rating-3">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-primary"
                              />
                            </label>
                            <label htmlFor="stars-rating-2">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-primary"
                              />
                            </label>
                            <label htmlFor="stars-rating-1">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-primary"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="row mt-3">
                          <div className="col-md-3 col-sm-6 col-xs-6">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-success"
                            >
                              View
                            </a>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-6">
                          <a
                              href="javascript:void(0);"
                              className="btn btn-success"
                            >
                              Add to Cart
                            </a>
                          </div>
                          <div className="col-md-3 col-sm-6 col-xs-6">
                            <p>
                              <span>stock: item.stock</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="description">
                      <p>item.description</p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
