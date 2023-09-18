import React from "react";
import RazorpayPaymentButton from "../CustomerPayment.jsx/RazorpayPaymentButton";
import PaypalPaymentButton from "../CustomerPayment.jsx/PaypalPaymentButton";
import StripePayment from "../CustomerPayment.jsx/StripePayment";


const MakePayment = () => {
    return (<>
        <div className="container-fluid d-flex justify-content-center pt-2">
            <div className="row">
                <div className="col-lg-12" style={{height : "60px"}}>
                    <RazorpayPaymentButton />
                </div>
                <div className="col-lg-12 ms-2 mb-2" style={{height : "80px"}}>
                    <PaypalPaymentButton />
                </div>
                <div className="col-lg-12 ms-2 mt-4">
                    <StripePayment />
                </div>
            </div>
        </div>
    </>)
}

export default MakePayment