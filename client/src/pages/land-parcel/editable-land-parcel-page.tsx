import { FormEvent, useRef, useState } from "react";
import { ClientForm, ClientFormErrors } from "../../components/form/client-form";
import { Spoiler } from "../../components/spoler/spoiler";
import { useErrors } from "../../service/use-errors";
import "./editable-application-page.sass";
import api from "../../service/api";
import { AddressForm, AddressFormErrors } from "../../components/form/address-form";
import { LandParcelForm, LandParcelFormErrors } from "../../components/form/land-parcel-form";
import { TermsForm, TermsFormErrors } from "../../components/form/terms-form";
import { EditableApplication } from "../../model/editable-application";
import { PhotoForm } from "../../components/form/photo-form";
import { Photo } from "../../model/photo";
import Resizer from "react-image-file-resizer";

export function EditableLandParcelPage() {
  const clientErrors = useErrors(new ClientFormErrors());
  const addressErrors = useErrors(new AddressFormErrors());
  const landParcelErrors = useErrors(new LandParcelFormErrors());
  const termsErrors = useErrors(new TermsFormErrors());
  const { current: application } = useRef(new EditableApplication());
  const [isUploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  async function persistClient(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/clients", payload);

    if (status === 422 || status === 409) {
      clientErrors.set(data.errors);
      return;
    }

    application.clientId = data;
  }

  async function persistAddress(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/addresses", payload);

    if (status === 422 || status === 409) {
      addressErrors.set(data.errors);
      return;
    }

    application.addressId = data;
  }

  async function persistLandParcel(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/land-parcels", payload);

    if (status === 422) {
      landParcelErrors.set(data.errors);
      return;
    }

    application.applicableId = data;
  }

  function resizeFile(file: File) {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(file, 2000, 1000, "JPEG", 100, 0, (uri) => resolve(uri), "blob");
    });
  }

  async function uploadToServer(files: FileList) {
    setUploading(true);
    const maximumAmountOfFiles = 15;
    const data = new FormData();
    const allowedAmountOfFiles = Math.min(maximumAmountOfFiles - photos.length, files.length);

    for (let i = 0; i < allowedAmountOfFiles; i++) {
      const file = (await resizeFile(files[i])) as File;
      data.append("images[]", file);
    }

    const response = await api.post<Photo[]>("/photos/upload-temp", data);

    if (response.status === 200) {
      const newPhotos = response.data;
      setPhotos([...photos, ...newPhotos]);
      application.photoIds = [...application.photoIds, ...newPhotos.map((photo) => photo.id)];
    } else {
      //TODO заменить по добавлении адекватной системы оповещений
      alert("Не удалось загрузить изображения");
    }

    setUploading(false);
  }

  async function removePhoto(id: number) {
    const response = await api.delete("/photos/" + id);

    if (response.status === 204) {
      setPhotos(photos.filter((photo) => photo.id != id));
      application.photoIds = application.photoIds.filter((photoId) => photoId != id);
    }
  }

  async function confirmTerms(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/applications/terms", payload);

    if (status === 422) {
      termsErrors.set(data.errors);
      return;
    }
  }

  return (
    <div className="editable-application-page">
      <h1 className="editable-application-page__header">New Land Parcel</h1>
      <Spoiler open title="Client">
        <ClientForm submit={persistClient} errors={clientErrors} />
      </Spoiler>
      <Spoiler open title="Address">
        <AddressForm submit={persistAddress} errors={addressErrors} />
      </Spoiler>
      <Spoiler open title="Land Parcel">
        <LandParcelForm submit={persistLandParcel} errors={landParcelErrors} />
      </Spoiler>
      <Spoiler open title="Photos">
        <PhotoForm photos={photos} submit={uploadToServer} uploading={isUploading} remove={removePhoto} />
      </Spoiler>
      <Spoiler open title="Contract">
        <TermsForm submit={confirmTerms} errors={termsErrors} />
      </Spoiler>
    </div>
  );
}
