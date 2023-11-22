import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./carousel.sass";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { env } from "../../env";
import classNames from "classnames";
import { Photo } from "../../model/photo";

type CarouselProps = {
  photos: Photo[];
  className?: string;
};

function Carousel({ photos, className }: CarouselProps) {
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
        {photos.map((photo) => (
          <img key={photo.id} src={`${env.PHORO_URL}/${photo.path}`} alt="" className="carousel__photo" />
        ))}
      </div>
      <div className="carousel__button-container">
        <div className="carousel__button carousel__button_side" onClick={() => goTo(currentIndex - 1)}>
          <FontAwesomeIcon className="carousel__button-icon" icon={faChevronLeft} />
        </div>
        {photos.map((_, index) => (
          <button
            key={index}
            className={classNames("carousel__button", { active: currentIndex === index })}
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
