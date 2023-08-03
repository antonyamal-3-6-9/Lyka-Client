import React from "react";

const LykaItemList = ({
  lykaItemData,
  handleRemoveVariant,
  colors,
  variants,
  finalSubmission
}) => {
  if (!lykaItemData.units || lykaItemData.units.length === 0) {
    return null;
  }

  return (
    <>
      <div className="row mt-3 p-3 border border-dark">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Color</th>
              <th>Variant</th>
              <th>Stock</th>
              <th>Original Price</th>
              <th>Selling Price</th>
              <th>Offer Price</th>
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
                <td>
                  <button
                    onClick={() => handleRemoveVariant(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row d-flex justify-content-center">
        <button
          className="btn btn-outline-success w-50"
          onClick={finalSubmission}
        >
          Create Item
        </button>
      </div>
      </div>

    </>
  );
};

export default LykaItemList;
