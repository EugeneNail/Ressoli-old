import { useState } from "react";
import { Photo } from "../../model/photo";
import "./gallery.sass";
import classNames from "classnames";

type GalleryProps = {
  className?: string;
  photos: Photo[];
};

export function Gallery({ className, photos }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goTo(index: number) {
    const images = document.getElementsByClassName("gallery__aside-photo");
    if (index >= 0 && index < images.length) {
      (images[index] as HTMLImageElement).scrollIntoView({
        block: "start",
        inline: "center",
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }

  return (
    <div className={classNames("gallery", className)}>
      <div className="gallery__aside-photos-container">
        {photos.map((photo, index) => (
          <img
            src={"http://localhost:8000/storage/" + photo.path}
            alt=""
            className={classNames("gallery__aside-photo", { selected: index === currentIndex })}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
      <div className="gallery__main-photo-container">
        <img
          src={"http://localhost:8000/storage/" + photos[currentIndex].path}
          alt=""
          className="gallery__main-photo"
        />
      </div>
    </div>
  );
}
