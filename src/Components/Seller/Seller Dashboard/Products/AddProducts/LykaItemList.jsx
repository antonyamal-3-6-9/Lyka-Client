import React from "react";
import { Button } from "@mui/material";

const LykaItemList = ({
  lykaItemData,
  handleRemoveVariant,
  colors,
  variants,
  finalSubmission,
  store
}) => {
  if (!lykaItemData.units || lykaItemData.units.length === 0) {
    return null;
  }

  return (
    <>
      <div className="row mt-3 p-3 border border-dark">
      <h6 className="h6 text-dark text-center">Seperate SKUs with selected variant, color and product will be generated</h6>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Color</th>
              <th>Variant</th>
              <th>Stock</th>
              <th>Original Price</th>
              <th>Selling Price</th>
              <th>Offer Price</th>
              <th>Warehouse</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lykaItemData.units.map((item, index) => (
              <tr key={index}>
                {colors.map(
                  (color) =>
                    color.id === item.color_code && (
                      <td key={color.id}>{color.color}</td>
                    )
                )}
                {variants.map(
                  (v) =>
                    v.id === item.variant && <td key={v.id}>{v.variation}</td>
                )}
                <td>{item.stock}</td>
                <td>{item.original_price}</td>
                <td>{item.selling_price}</td>
                <td>{item.offer_price}</td>
                {store.map((s) => s.store_id === item.warehouse && 
                  <td>{s.store_name}</td>
                )}
                <td>
                  <Button
                    onClick={() => handleRemoveVariant(index)}
                    style={{color: "#3E3232"}}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row d-flex justify-content-center">
        <Button
          variant="contained"
          style={{backgroundColor: "#3E3232", width: "50%"}}
          onClick={finalSubmission}
        >
          Create Item
        </Button>
      </div>
      </div>

    </>
  );
};

export default LykaItemList;
