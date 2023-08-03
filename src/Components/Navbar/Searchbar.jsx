import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faCheckSquare, faCoffee);


function Searchbar() {
  return (
    <>
      <div>
        <form className="d-flex" role="search">
            <input className="search-bar me-2 mt-auto mb-auto" type="search" placeholder="Search" aria-label="Search" name="keyword"/>
            <button className="btn btn-primary search-button" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
         </form>
        </div>
    </>
  );
}

export default Searchbar
