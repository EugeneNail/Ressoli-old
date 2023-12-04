import { ChangeEvent, useState, DragEvent } from "react";
import { Photo } from "../../model/photo";
import { Icon } from "../icon/icon";
import "./form.sass";
import "./photo-form.sass";

type PhotoFormProps = {
  submit: (files: FileList) => void;
  uploading: boolean;
  remove: (id: number) => void;
  photos: Photo[];
};

export function PhotoForm({ submit, uploading, remove, photos }: PhotoFormProps) {
  const [isDragged, setDragged] = useState(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragged(true);
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files as FileList;
    if (!files || !files.length) {
      return;
    }
    setDragged(false);
    submit(files);
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    if (!files || !files.length) {
      return;
    }
    submit(files);
  }

  return (
    <form action="" onSubmit={(e) => e.preventDefault()} className="form photo-form">
      <div className="photo-form__grid">
        <div className="photo-form__upload">
          <div
            className="photo-uploader"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragged(false)}
          >
            {uploading && (
              <>
                <Icon className="photo-uploader__icon spinning" name="autorenew" />
                <p className="photo-uploader__text">Uploading</p>
              </>
            )}
            {!uploading && (
              <>
                <Icon className="photo-uploader__icon" name="upload_file" />
                <p className="photo-uploader__text">{isDragged ? "" : "Drag&Drop files here or"}</p>
              </>
            )}
            {!uploading && !isDragged && (
              <label htmlFor="photoInput" className="photo-uploader__label">
                <input
                  multiple
                  onChange={handleChange}
                  type="file"
                  id="photoInput"
                  className="photo-uploader__input"
                  accept=".jpg,.jpeg,.png,.bmp"
                />
                <p className="photo-uploader__button-text">Browse files</p>
              </label>
            )}
          </div>
        </div>
        {photos.length > 0 &&
          photos.map((photo) => (
            <div className="photo-form__photo">
              <img src={"http://localhost:8000/storage/" + photo.path} alt="" className="photo-form__image" />
              <button className="photo-form__button" onClick={() => remove(photo.id)}>
                <Icon className="photo-form__icon" name="delete" />
              </button>
            </div>
          ))}
      </div>
    </form>
  );
}
