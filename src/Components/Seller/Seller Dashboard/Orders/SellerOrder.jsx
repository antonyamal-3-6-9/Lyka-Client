import React from "react";

const SellerOrder = () => {
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sl No</th>
            <th scope="col">Order Id</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td> <a>5845884455458454
            45877511111</a></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Cromption</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>@facebook</td>
            <td>@twitter</td>
            <td>@insta</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};


export default SellerOrder
