import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SellerHomeNavbar = (props) => {
  const [sellerData, setSelletData] = useState({});

  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/seller/";

  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try{
     const logoutResponse = await axios.post(`${BASE_URL}logout/`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      })
    } catch (error) {
      console.log(error)
    }
    localStorage.clear("token");
    navigate("/");
  };


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          BASE_URL + "seller-loggedin-or-not/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response1.status === 200) {
          const response2 = await axios.get(BASE_URL + "get-seller/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          if (response2.status === 200) {
            setSelletData(response2.data);
          }
        }
      } catch (error) {
        navigate("/");
      }
    };

    fetchData();
  }, []);

  if (
    !sellerData ||
    !sellerData.user ||
    !sellerData.user.first_name ||
    !sellerData.user.last_name
  ) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          LYKA Seller
        </a>

        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/profile">
                Hy {sellerData.user.first_name} {sellerData.user.last_name}
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/home">
                Home
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/products">
                Products
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/verify">
                Verifications
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/store">
                Pickup Stores
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <Link className="nav-link" to="/seller/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              <a className="nav-link" href="#">
                Wallet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SellerHomeNavbar;
