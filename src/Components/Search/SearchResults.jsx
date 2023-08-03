import React from "react";
import "../Search/search.scss"


const SearchResults = () => {
  return (
    <>
      <div id="search-results-container">
        <div className="container-fluid w-100 h-100">
            <div className="row">
                <div className="col-lg-12">
                    <div className="result-card">
                        <div className="card w-100 h-100 rounded-0">
                            <div className="result h-100 w-100">
                                <div className="row w-100 h-100">
                                    <div className="col-lg-4 h-100">
                                        <img src="https://www.91-img.com/pictures/148742-v5-samsung-galaxy-s23-5g-mobile-phone-large-2.jpg?tr=h-271,c-at_max,q-60" className="w-100 h-100"></img>
                                    </div>
                                    <div className="col-lg-8 h-100 d-flex justify-content-center align-items-center">
                                        <p>Product Name</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults
