import axios from "axios";
import React from "react";

const EditImages = (props) => {

  const handleFileChange = (event) => {
    const { files } = event.target;
    const newImage = Array.from(files);
    props.setNewImages([...props.newImages, ...newImage]);
  };

  const handleRemoveImage = (index, id) => {

    const token = localStorage.getItem('token')

    axios.delete(props.Base_Url + "delete-image/" + id + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then(response => {
          console.log(response.data);
          const updatedImages = [...props.existingImages];
          updatedImages.splice(index, 1);
          props.setExistingImages(updatedImages);

        })
        .catch(error => {
          console.error(error);
        });

  };

  const handleRemoveImageNew = (index) => {
    const updatedImages = [...props.newImages];
    updatedImages.splice(index, 1);
    props.setNewImages(updatedImages);
  }

  return (
    <>
      <div className="col-lg-12 p-3">
        <div className="col-lg-6">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {props.existingImages.map((file, index) => (
          <div className="col-lg-6 m-2" key={index}>
            <span>{file.name} </span>
            <img src={"http://localhost:8000" + file.image} style={{width : "100px", height : "150px"}} alt={file.name} />
            <button
            type="button"
              className="btn btn-dark"
              onClick={() => handleRemoveImage(index, file.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>New Images:</h2>
        {props.newImages.map((file, index) => (
          <div className="col-lg-6 m-2" key={index}>
            <span>{file.name}</span>
            <img
              src={URL.createObjectURL(file)}
              style={{ width: "100px", height: "150px" }}
              alt={file.name}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleRemoveImageNew(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditImages;
