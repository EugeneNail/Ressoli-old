import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../service/api";
import Photobox from "../inputbox/photobox";

export class PhotoFormFields {
  photoUrls: string[] = [];
}

export class PhotoFormErrors {
  photoUrls: string[] = [];
}

type PhotoFormProps = {
  back: () => void;
  submit: () => void;
  photoUrls: string[];
  setPhotoUrls: Dispatch<SetStateAction<string[]>>;
};

const PhotoForm: FC<PhotoFormProps> = ({ back, submit, photoUrls, setPhotoUrls }) => {
  const [isLoading, setLoading] = useState(false);
  const maximumAmountOfFiles = 15;

  const uploadToServer = async (files: FileList) => {
    setLoading(true);
    const data = new FormData();

    const allowedAmountOfFiles = Math.min(maximumAmountOfFiles - photoUrls.length, files.length);
    for (let i = 0; i < allowedAmountOfFiles; i++) {
      data.append("images[]", files[i]);
    }

    const response = await api.post("/upload-temp-images", data);

    if (response.status === 200) {
      const newUrls = Array.from(response.data).map((path) => "http://localhost:8000/storage/" + path);
      setPhotoUrls([...photoUrls, ...newUrls]);
    } else {
      //TODO заменить по добавлении адекватной системы оповещений
      alert("Не удалось загрузить изображения");
    }

    setLoading(false);
  };

  const removeImage = (indexToRemove: number) => {
    setPhotoUrls(photoUrls.filter((_, index) => index != indexToRemove));
  };

  return (
    <form className="form form_photo">
      <h1 className="form__header">Фотографии</h1>
      <p className="form__subtext">Загрузите до {maximumAmountOfFiles} фотографий</p>
      <div className="form__photos">
        {photoUrls.length > 0 &&
          photoUrls.map((image, index) => (
            <div className="form__photo-container">
              <img key={index} src={image} className="form__photo" />
              <FontAwesomeIcon className="form__photo-icon" onClick={() => removeImage(index)} icon={faTrash} />
            </div>
          ))}
        <div className="form__photo-container">
          <Photobox isLoading={isLoading} action={uploadToServer} />
        </div>
      </div>
      <div className="form__button-group">
        {!isLoading && (
          <>
            <Button style="dotted" wide text="Назад" action={() => back()} />
            <Button style="filled" wide text="Далее" action={() => submit()} />
          </>
        )}
      </div>
    </form>
  );
};

export default PhotoForm;
