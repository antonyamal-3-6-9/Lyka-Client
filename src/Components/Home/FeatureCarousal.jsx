import React from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";

const FeatureCarousel = () => {
  const options = {
    items: 6,
    nav: true,
    rewind: true,
    dots: false,
    autoplay: true,
    autoHeight: false,
    margin: 15, // Add space between carousel items
    navText: [
      '<span class="carousel-control-prev-icon c-icon"></span>',
      '<span class="carousel-control-next-icon c-icon"></span>',
    ],
    // Use FontAwesome icons for navigation buttons
    responsive: {
      // Responsive breakpoints
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  };

  const items = [
    <div key={1}>
      <div
        style={{ width: "300px", height: "300px", backgroundColor: "blue" }}
      ></div>
    </div>,
    <div key={2}><img className="carousal-img" src="https://picsum.photos/200/300" alt="Image 2" /></div>,
    <div key={3}><img className="carousal-img" src="https://picsum.photos/200/300" alt="Image 3" /></div>,
    <div key={4}><img className="carousal-img" src="https://picsum.photos/200/300" alt="Image 3" /></div>,
    <div key={5}><img className="carousal-img" src="https://picsum.photos/200/300" alt="Image 3" /></div>,
    <div key={6}><img className="carousal-img" src="https://picsum.photos/200/300" alt="Image 3" /></div>
  ];

  return (
    <div className="feature-carousel-container">
      <OwlCarousel options={options}>{items}</OwlCarousel>
    </div>
  );
};

export default FeatureCarousel;
