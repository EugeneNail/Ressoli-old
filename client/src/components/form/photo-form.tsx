import { Dispatch, SetStateAction, useState } from "react";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../service/api";
import Photobox from "../inputbox/photobox";
import { Photo } from "../../model/photo";
import { env } from "../../env";

export class PhotoFormFields {
  photoUrls: string[] = [];
}

export class PhotoFormErrors {
  photoUrls: string[] = [];
}

type PhotoFormProps = {
  back: () => void;
  submit: () => void;
  state: [Photo[], Dispatch<SetStateAction<Photo[]>>];
};

function PhotoForm({ back, submit, state: [photos, setPhotos] }: PhotoFormProps) {
  const [isLoading, setLoading] = useState(false);
  const maximumAmountOfFiles = 15;

  async function uploadToServer(files: FileList) {
    setLoading(true);
    const data = new FormData();
    const allowedAmountOfFiles = Math.min(maximumAmountOfFiles - photos.length, files.length);

    for (let i = 0; i < allowedAmountOfFiles; i++) {
      data.append("images[]", files[i]);
    }

    const response = await api.post<Photo[]>("/photos/upload-temp", data);

    if (response.status === 200) {
      const newPhotos = response.data;
      setPhotos([...photos, ...newPhotos]);
    } else {
      //TODO заменить по добавлении адекватной системы оповещений
      alert("Не удалось загрузить изображения");
    }

    setLoading(false);
  }

  async function removePhoto(id: number) {
    const response = await api.delete("/photos/" + id);
    console.log(response);
    if (response.status === 204) {
      setPhotos(photos.filter((photo) => photo.id != id));
    }
  }

  return (
    <form className="form form_photo">
      <h1 className="form__header">Фотографии</h1>
      <p className="form__subtext">Загрузите до {maximumAmountOfFiles} фотографий</p>
      <div className="form__photos">
        {photos.length > 0 &&
          photos.map((photo) => (
            <div key={photo.id} className="form__photo-container">
              <img src={`${env.PHORO_URL}}/${photo.path}`} className="form__photo" />
              <FontAwesomeIcon className="form__photo-icon" onClick={() => removePhoto(photo.id)} icon={faTrash} />
            </div>
          ))}
        <div className="form__photo-container">
          <Photobox isLoading={isLoading} action={uploadToServer} />
        </div>
      </div>
      <div className="form__button-group">
        {!isLoading && (
          <>
            <Button style="dotted" wide text="Назад" action={back} />
            <Button style="filled" wide text="Далее" action={submit} />
          </>
        )}
      </div>
    </form>
  );
}

export default PhotoForm;
