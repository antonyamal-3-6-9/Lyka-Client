import React from "react";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

export default function FeatureCard({}) {
  return (
    <>
      <div
        className="container-fluid p-3"
        style={{ backgroundColor: "#E2F1F6" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <h5 className="h5 text-dark text-center">
                Wide Range of Products
              </h5>
              <div className="col-lg-3 d-flex justify-content-end align-items-center">
                <WarehouseIcon
                  style={{ fontSize: "7rem", color: "#234456" }}
                />
              </div>
              <div className="col-lg-7 d-flex justify-content-start align-items-center">
                <span className="text-dark h6">
                  Discover a World of Possibilities at Our E-commerce Haven!
                  With an Extensive Array of Categories and Products, Find
                  Everything You Need in One Place. Explore Limitless Choices
                  and Shop with Confidence Today
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <h5 className="h5 text-dark text-center">Trusted Sellers</h5>
              <div className="col-lg-2"></div>
              <div className="col-lg-7 d-flex justify-content-end align-items-center">
                <span className="text-dark h6">
                  Shop Securely with Confidence! Our E-commerce Platform
                  Features Only Legitimate and Verified Sellers Offering
                  Top-Quality Products. Rest Assured, Every Purchase Is Backed
                  by Trust and Reliability. Experience Peace of Mind as You
                  Explore Our Wide Range of Products
                </span>
              </div>
              <div className="col-lg-3 d-flex justify-content-start align-items-center">
                <VerifiedUserIcon
                  style={{ fontSize: "7rem", color: "#234456" }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <h5 className="h5 text-dark text-center">Transparent Pricing</h5>
              <div className="col-lg-3 d-flex justify-content-end align-items-center">
                <AttachMoneyIcon
                  style={{ fontSize: "7rem", color: "#234456" }}
                />
              </div>
              <div className="col-lg-7 d-flex justify-content-start align-items-center">
                <span className="text-dark h6">
                  Shop with Confidence on our platform, where transparency
                  reigns supreme! Enjoy Transparent Pricing with no hidden fees
                  or surprises, ensuring every purchase is straightforward and
                  fair. Trust in our commitment to honesty and integrity, making
                  your shopping experience smooth and worry-free!
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <h5 className="h5 text-center text-dark">All India Delivery</h5>
              <div className="col-lg-2"></div>
              <div className="col-lg-7 d-flex justify-content-end align-items-center">
                <span className="text-dark h6">
                  Experience Nationwide Convenience with Our All-India Shipping!
                  No matter where you are in the country, we've got you covered.
                  Enjoy hassle-free delivery to your doorstep, ensuring that you
                  can access our wide range of products no matter your location.
                  Shop with ease and let us bring the world of possibilities to
                  your doorstep
                </span>
              </div>
              <div className="col-lg-3 d-flex justify-content-start align-items-center">
                <HomeWorkOutlinedIcon
                  style={{ fontSize: "7rem", color: "#234456" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
