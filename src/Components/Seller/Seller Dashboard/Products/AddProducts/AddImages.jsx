import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const AddImages = (props) => {
  const handleFileChange = (event) => {
    const { files } = event.target;
    const newImages = Array.from(files);
    props.setImage({
      ...props.images,
      images: [...props.images.images, ...newImages],
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...props.images.images];
    updatedImages.splice(index, 1);
    props.setImage({
      ...props.images,
      images: updatedImages,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-4 m-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="d-flex flex-wrap justify-content-evenly">
          {props.images.images.map((file, index) => (
            <>
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width="120px"
                  style={{
                    border: "1px grey solid",
                    padding: "10px",
                    display: "inline",
                  }}
                />

                <IconButton onClick={() => handleRemoveImage(index)}>
                  <CloseIcon />
                </IconButton>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddImages;
