import React from "react";
import OrderProgress from "./OrderProgress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEllipsisVertical, faPencil, faPrint, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const SellerOrderDetails = () => {
  return (
    <>
     <div className="container-fluid">
      <div className="container">
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center py-3">
          <h2 className="h5 mb-0"><a href="#" className="text-muted"></a> Order #16123222</h2>
        </div>

        {/* Main content */}
        <div className="row">
          <div className="col-lg-8">
            {/* Details */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <span className="me-3">22-11-2021</span>
                    <span className="me-3">#16123222</span>
                    <span className="me-3">Visa -1234</span>
                    <span className="badge rounded-pill bg-info">SHIPPING</span>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                      <FontAwesomeIcon icon={faDownload} /> <span className="text">Invoice</span>
                    </button>
                    <div className="dropdown">
                      <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faPencil} /> Edit</a></li>
                        <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faPrint} /> Print</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <img src="https://www.bootdey.com/image/280x280/87CEFA/000000" alt="" width="35" className="img-fluid" />
                          </div>
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0"><a href="#" className="text-reset">Wireless Headphones with Noise Cancellation Tru Bass Bluetooth HiFi</a></h6>
                            <span className="small">Color: Black</span>
                          </div>
                        </div>
                      </td>
                      <td>1</td>
                      <td className="text-end">$79.99</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <img src="https://www.bootdey.com/image/280x280/FF69B4/000000" alt="" width="35" className="img-fluid" />
                          </div>
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0"><a href="#" className="text-reset">Smartwatch IP68 Waterproof GPS and Bluetooth Support</a></h6>
                            <span className="small">Color: White</span>
                          </div>
                        </div>
                      </td>
                      <td>1</td>
                      <td className="text-end">$79.99</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">Subtotal</td>
                      <td className="text-end">$159,98</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Shipping</td>
                      <td className="text-end">$20.00</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Discount (Code: NEWYEAR)</td>
                      <td className="text-danger text-end">-$10.00</td>
                    </tr>
                    <tr className="fw-bold">
                      <td colSpan="2">TOTAL</td>
                      <td className="text-end">$169,98</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="card mb-4">
                <OrderProgress />
            </div>

            {/* Payment */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h3 className="h6">Payment Method</h3>
                    <p>Visa -1234 <br />
                    Total: $169,98 <span className="badge bg-success rounded-pill">PAID</span></p>
                  </div>
                  <div className="col-lg-6">
                    <h3 className="h6">Billing address</h3>
                    <address>
                      <strong>John Doe</strong><br />
                      1355 Market St, Suite 900<br />
                      San Francisco, CA 94103<br />
                      <abbr title="Phone">P:</abbr> (123) 456-7890
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {/* Customer Notes */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6">Customer Notes</h3>
                <p>Sed enim, faucibus litora velit vestibulum habitasse. Cras lobortis cum sem aliquet mauris rutrum. Sollicitudin. Morbi, sem tellus vestibulum porttitor.</p>
              </div>
            </div>

            {/* Shipping information */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6">Shipping Information</h3>
                <strong>FedEx</strong>
                <span><a href="#" className="text-decoration-underline" target="_blank">FF1234567890</a> <FontAwesomeIcon icon={faArrowUp} /></span>
                <hr />
                <h3 className="h6">Address</h3>
                <address>
                  <strong>John Doe</strong><br />
                  1355 Market St, Suite 900<br />
                  San Francisco, CA 94103<br />
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SellerOrderDetails;
