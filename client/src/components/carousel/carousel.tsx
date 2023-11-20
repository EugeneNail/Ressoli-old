import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./carousel.sass";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type CarouselProps = {
  photoUrls: string[];
  className?: string;
};

function Carousel({ photoUrls, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  async function goTo(index: number) {
    const images = document.getElementsByClassName("carousel__photo");

    if (index >= 0 && index < images.length) {
      (images[index] as HTMLImageElement).scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__photo-container">
        {photoUrls.map((url, index) => (
          <img key={index} src={"http://localhost:8000/storage/" + url} alt="" className="carousel__photo" />
        ))}
      </div>
      <div className="carousel__button-container">
        <div className="carousel__button carousel__button_side" onClick={() => goTo(currentIndex - 1)}>
          <FontAwesomeIcon className="carousel__button-icon" icon={faChevronLeft} />
        </div>
        {photoUrls.map((_, index) => (
          <button
            key={index}
            className={`carousel__button ${currentIndex === index ? "active" : ""}`}
            onClick={() => goTo(index)}
          />
        ))}
        <div className="carousel__button carousel__button_side" onClick={() => goTo(currentIndex + 1)}>
          <FontAwesomeIcon className="carousel__button-icon" icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
