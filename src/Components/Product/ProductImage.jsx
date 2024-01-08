import React, { useState, useRef } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  let lastTapTime = 0;

  const handleImageClick = () => {
    const currentTime = new Date().getTime();
    const tapTimeDifference = currentTime - lastTapTime;
    lastTapTime = currentTime;
    const doubleTapDelay = 300;

    if (tapTimeDifference < doubleTapDelay) {
      toggleFullScreen();
    }
  };

  if(!selectedImage){
    return null
  }

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      const container = containerRef.current;
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen((prevFullScreen) => !prevFullScreen);
  };

  return (
    <>
      <div className="image-gallery">
        <div className="row">
          <div className="col-lg-2">
            <div className="thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://127.0.0.1:8000${image.image}`}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleThumbnailClick(image)}
                  className={`m-3 ${
                    selectedImage === image
                      ? "border border-1 border-primary"
                      : ""
                  }`}
                  width="40px"
                  height="70px"
                />
              ))}
            </div>
          </div>
          <div className="col-lg-10">
            <div
              className="main-image"
              ref={containerRef}
              onClick={handleImageClick}
              style={{
                width: isFullScreen ? "70%" : imageRef.current?.naturalWidth,
                height: isFullScreen
                  ? "50%"
                  : imageRef.current?.naturalHeight,
                margin: "auto", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={`http://127.0.0.1:8000${selectedImage.image}`}
                alt="Main"
                ref={imageRef}
                style={{
                  width: isFullScreen ? "70%" : "auto",
                  height: isFullScreen ? "70%" : "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
