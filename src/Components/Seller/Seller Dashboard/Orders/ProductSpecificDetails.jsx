import React from "react";

const ProductSpecificDetails = () => {
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sl No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Product Id</th>
            <th scope="col">Quantity</th>
            <th scope="col">Rate</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Apple Iphone 16 Pro Max 6Gb 128 Gb</td>
            <td>Mobiles</td>
            <td>39479479347394729374</td>
            <td>2</td>
            <td>123,999</td>
            <td>234,456</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5"></td>
            <th>Total Price:</th>
            <td id="totalPrice">123,234,343</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ProductSpecificDetails;
