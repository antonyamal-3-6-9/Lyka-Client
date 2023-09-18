import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { customerLogin, customerLogout } from "../../redux/customerAuth/actions/authCustomerActions";


function Userdropdown(props) {
  const [username, setUsername] = useState("");

  const isLoggedIn = useSelector((state) => state.customerAuth.isCustomerLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASE_URL = "http://127.0.0.1:8000/customer/";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInResponse = await axios.get(`${BASE_URL}is-loggedin/`, {
          headers: {
            "content-Type": "Application/json",
            Authorization : `Bearer ${token}`,
          },
        });
        if (loggedInResponse.status === 200) {
          console.log(loggedInResponse);
          setUsername(loggedInResponse.data.name);
          dispatch(customerLogin())
        }
      } catch (error) {
        console.log(error);
        dispatch(customerLogout())
      }
    };
    fetchData();
  }, []);

  const handleLogin = () => {
    if (!isLoggedIn) {
      navigate("/customer-login")
    } else {
      return
    }
  }

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
    dispatch(customerLogout())
  };

  return (
    <>
      <li className={`nav-item ${isLoggedIn ? "dropdown item" : ""}`}>
        <a
          className={`nav-link text-light ${
            isLoggedIn ? "dropdown-toggle" : ""
          }`}
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle={isLoggedIn ? "dropdown" : ""}
          aria-expanded="false"
          onClick={handleLogin}
        >
          {!isLoggedIn ? "Login" : username !== null ? username : "User"}
        </a>

        {isLoggedIn && (
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to="/orders">
                Orders
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/account/profile">
                Profile
              </Link>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Log out
              </a>
            </li>
          </ul>
        )}
      </li>
    </>
  );
}

export default Userdropdown;
