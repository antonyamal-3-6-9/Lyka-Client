import React from "react";
import Sales from "./Sales";
import SalesChart from "./SalesChart";
import SalesReport from "./SalesReport";


const SellerHome = () => {
    return (<>
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-lg-4">
                    <SalesReport />
                </div>
                <div className="col-lg-8">
                    <SalesChart />
                </div>
            </div>
            <div className="row p-3">
                <Sales/>
            </div>
        </div>
    </>)
}

export default SellerHome