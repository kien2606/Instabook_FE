import React, { useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SlideImages({ images }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideLength = images.length - 1;
  const handlePreSlide = () => {
    slideIndex === 0
      ? setSlideIndex(slideLength)
      : setSlideIndex(slideIndex - 1);
  };
  const handleNextSlide = () => {
    slideIndex === slideLength
      ? setSlideIndex(0)
      : setSlideIndex(slideIndex + 1);
  };
  return (
    <div className="slide">
      {slideLength > 0 && (
        <ChevronLeftIcon className="btn_left" onClick={handlePreSlide} />
      )}
      {images.map((image, index) => {
        return (
          <div
            className={index === slideIndex ? "image active" : "image"}
            key={index}
          >
            <img src={image.url} alt="slide_show" />
          </div>
        );
      })}
      {slideLength > 0 && (
        <ChevronRightIcon onClick={handleNextSlide} className="btn_right" />
      )}
    </div>
  );
}

export default SlideImages;
