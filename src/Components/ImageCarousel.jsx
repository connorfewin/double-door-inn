import React, { useState } from "react";
import "../Styles/Components/ImageCarousel.css";

function ImageCarousel({ commentImages }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % commentImages.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? commentImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="ImageCarousel">
      <button className="CarouselButton CarouselButtonLeft" onClick={handlePrev}>
        &#9664;
      </button>
      <div className="CarouselImageWrapper" style={{ transform: `translateX(-${index * 100}%)` }}>
        {commentImages.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Comment Image ${i + 1}`}
            className="CarouselDisplayImage"
          />
        ))}
      </div>
      <button className="CarouselButton CarouselButtonRight" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
}

export default ImageCarousel;
