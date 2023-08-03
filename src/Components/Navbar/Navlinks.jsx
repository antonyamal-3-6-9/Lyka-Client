import React from "react";
import Extradropdown from "./Extradropdown";
import Userdropdown from "./Userdropdown";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function Navlinks(props) {
  return (
    <>
        <ul className="navbar-nav mb-lg-0">
          <Userdropdown 
          />
          <li className="nav-item item">
            <Link to="/seller-login" className="nav-link text-light">Login As Seller</Link>
          </li>
          <Extradropdown />
          <li className="nav-item item">
            <Link className="nav-link active text-light" aria-current="page" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
    </>
  );
}

export default Navlinks
