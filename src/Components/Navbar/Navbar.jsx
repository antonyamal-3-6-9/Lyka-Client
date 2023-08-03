import React, { useState } from "react";
import "./navbar.css";
import Searchbar from "./Searchbar";
import Navlinks from "./Navlinks";
import SearchResults from "../Search/SearchResults";
import LoginModal from "../Customer/Login and Register/CustomerLogin";
import { Link } from "react-router-dom";

function Navbar() {

  const [onSearch, setOnSearch] = useState(false)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid nav-links">
          <Link className="navbar-brand brand" to="/">
            LYKA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Searchbar />
            <Navlinks 
            />
          </div>
        </div>
      </nav>
      {onSearch && <SearchResults />}
    </>
  );
}

export default Navbar;
