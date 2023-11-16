import { ChangeEvent, FC, useState, DragEvent } from "react";
import "./inputbox.sass";
import { faSpinner, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PhotoboxProps = {
  isLoading: boolean;
  action: (files: FileList) => void;
};

const Photobox: FC<PhotoboxProps> = ({ isLoading, action }) => {
  const [isDragged, setDragged] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragged(true);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files as FileList;

    if (!files || !files.length) {
      return;
    }

    setDragged(false);
    action(files);
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;

    if (!files || !files.length) {
      return;
    }

    action(files);
  };

  return (
    <div className="photobox" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={() => setDragged(false)}>
      {isLoading && (
        <>
          <FontAwesomeIcon className="photobox__icon" icon={faSpinner} spin />
          <p className="photobox__text">Загружаем на сервер</p>
        </>
      )}
      {!isLoading && (
        <>
          <FontAwesomeIcon className="photobox__icon" icon={faFileArrowUp} />
          <p className="photobox__text">
            {isDragged ? "Отпустите, чтобы загрузить фотографии" : "Перетащите сюда свои фотографии или"}
          </p>
        </>
      )}
      {!isLoading && !isDragged && (
        <label htmlFor="photoInput" className="photobox__label">
          <input
            multiple
            onChange={handleChange}
            type="file"
            id="photoInput"
            className="photobox__input"
            // accept=".jpg,.jpeg,.png,.bmp"
          />
          <p className="photobox__button-text">Выберите файлы</p>
        </label>
      )}
    </div>
  );
};

export default Photobox;
