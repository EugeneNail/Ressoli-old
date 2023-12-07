import { FormEvent, useRef, useState } from "react";
import { AddressFormErrors } from "../../components/form/address-form";
import { ClientFormErrors } from "../../components/form/client-form";
import { LandParcelFormErrors } from "../../components/form/land-parcel-form";
import { TermsFormErrors } from "../../components/form/terms-form";
import { useErrors } from "../../service/use-errors";
import { Photo } from "../../model/photo";
import { useNavigate } from "react-router";
import api from "../../service/api";
import { EditableApplication } from "../../model/editable-application";
import { Terms } from "../../model/terms";
import Resizer from "react-image-file-resizer";

export function useEditableApplicationPageState() {
  const clientErrors = useErrors(new ClientFormErrors());
  const addressErrors = useErrors(new AddressFormErrors());
  const landParcelErrors = useErrors(new LandParcelFormErrors());
  const termsErrors = useErrors(new TermsFormErrors());
  const [isUploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [formSaves, setFormSaves] = useState([false, false, false, false, false]);
  const { current: application } = useRef(new EditableApplication());
  const navigate = useNavigate();

  function setSaved(indexToUpdate: number, newValue: boolean) {
    setFormSaves(formSaves.map((value, index) => (index === indexToUpdate ? newValue : value)));
  }

  async function persistClient(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/clients", payload);
    // setFormLocks([true, false, true, true, true]);
    if (status === 422 || status === 409) {
      clientErrors.set(data.errors);
      return;
    }

    setSaved(0, true);
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

    setSaved(1, true);
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

    setSaved(2, true);
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

    setSaved(3, true);
    setUploading(false);
  }

  async function removePhoto(id: number) {
    setUploading(true);
    setSaved(3, false);
    const response = await api.delete("/photos/" + id);

    if (response.status === 204) {
      setPhotos(photos.filter((photo) => photo.id != id));
      application.photoIds = application.photoIds.filter((photoId) => photoId != id);
      setUploading(false);
      setSaved(3, true);
    }
  }

  async function persistTerms(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/terms", payload);

    if (status === 422) {
      termsErrors.set(data.errors);
      return;
    }

    application.termsId = data;
    setSaved(4, true);
  }

  async function persistApplication() {
    if (!formSaves.every((saved) => saved === true)) {
      //TODO replace with notification system
      alert("Not all the forms are saved");
      return;
    }

    const { data, status } = await api.post("/applications/land-parcels", application);
    if (status > 400) {
      return;
    }

    navigate("/land-parcels/" + data);
  }

  return {
    clientErrors,
    addressErrors,
    landParcelErrors,
    termsErrors,
    isUploading,
    setUploading,
    formSaves,
    setFormSaves,
    photos,
    setPhotos,
    setSaved,
    persistClient,
    persistAddress,
    persistLandParcel,
    uploadToServer,
    removePhoto,
    persistTerms: persistTerms,
    createNewApplication: persistApplication,
  };
}
