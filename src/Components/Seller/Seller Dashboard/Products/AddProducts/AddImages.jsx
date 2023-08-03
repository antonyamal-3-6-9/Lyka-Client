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
      <div className="col-lg-12 p-3">
        <div className="col-lg-4 m-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        {props.images.images.map((file, index) => (
          <div className="col-lg-6 m-2" key={index}>
            <span>{file.name} </span>
            <br></br>
            <button
              className="btn btn-dark me-5"
              onClick={() => handleRemoveImage(index)}
            >
              Remove
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              width="80px"
              height="200px"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AddImages;
