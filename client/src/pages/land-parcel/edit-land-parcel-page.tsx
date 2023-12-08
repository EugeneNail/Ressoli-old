import { ClientForm } from "../../components/form/client-form";
import { Spoiler } from "../../components/spoler/spoiler";
import { AddressForm } from "../../components/form/address-form";
import { LandParcelForm } from "../../components/form/land-parcel-form";
import { TermsForm } from "../../components/form/terms-form";
import { PhotoForm } from "../../components/form/photo-form";
import { useEditableApplicationPageState } from "./use-editable-application-page-state";
import "./editable-application-page.sass";
import { useEffect, useState } from "react";
import { Application } from "../../model/application";
import { useParams } from "react-router";
import api from "../../service/api";

export function EditLandParcelPage() {
  const state = useEditableApplicationPageState();
  const [initialApplication, setInitialApplication] = useState(new Application());
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/applications/land-parcels/" + id).then(({ data }) => {
      setInitialApplication(data);
      state.extractMeta(data);
      state.setPhotos(data.photos);
      setLoading(false);
      // console.log(data);
      console.log(initialApplication);
    });
  }, []);

  return (
    <div className="editable-application-page">
      <h1 className="editable-application-page__header">
        {initialApplication?.applicable?.title ? initialApplication?.applicable?.title : "Land Parcel №" + id}
      </h1>
      {!isLoading && (
        <>
          <Spoiler open title="Client">
            <ClientForm
              initialState={initialApplication.client}
              saved={state.formSaves[0]}
              unsave={() => state.setSaved(0, false)}
              submit={state.persistClient}
              errors={state.clientErrors}
            />
          </Spoiler>
          <Spoiler open title="Address">
            <AddressForm
              initialState={initialApplication.address}
              saved={state.formSaves[1]}
              unsave={() => state.setSaved(1, false)}
              submit={state.persistAddress}
              errors={state.addressErrors}
            />
          </Spoiler>
          <Spoiler open title="Land Parcel">
            <LandParcelForm
              saved={state.formSaves[2]}
              unsave={() => state.setSaved(2, false)}
              submit={state.persistLandParcel}
              errors={state.landParcelErrors}
              initialState={initialApplication.applicable}
            />
          </Spoiler>
          <Spoiler open title="Photos">
            <PhotoForm
              saved={state.formSaves[3]}
              unsave={() => state.setSaved(3, false)}
              photos={state.photos}
              submit={state.uploadToServer}
              uploading={state.isUploading}
              remove={state.removePhoto}
            />
          </Spoiler>
          <Spoiler open title="Contract">
            <>
              <TermsForm
                initialState={initialApplication.terms}
                saved={state.formSaves[4]}
                unsave={() => state.setSaved(4, false)}
                submit={state.persistTerms}
                errors={state.termsErrors}
              />
            </>
          </Spoiler>
        </>
      )}
    </div>
  );
}
