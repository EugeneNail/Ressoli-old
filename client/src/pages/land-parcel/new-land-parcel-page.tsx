import { ClientForm } from "../../components/form/client-form";
import { Spoiler } from "../../components/spoler/spoiler";
import { AddressForm } from "../../components/form/address-form";
import { LandParcelForm } from "../../components/form/land-parcel-form";
import { TermsForm } from "../../components/form/terms-form";
import { PhotoForm } from "../../components/form/photo-form";
import Button from "../../components/button/button";
import { useEditableApplicationPageState } from "./use-editable-application-page-state";
import "./editable-application-page.sass";

export function NewLandParcelPage() {
  const state = useEditableApplicationPageState();

  return (
    <div className="editable-application-page">
      <h1 className="editable-application-page__header">New Land Parcel</h1>
      <Spoiler open title="Client">
        <ClientForm
          saved={state.formSaves[0]}
          unsave={() => state.setSaved(0, false)}
          submit={state.persistClient}
          errors={state.clientErrors}
        />
      </Spoiler>
      <Spoiler open title="Address">
        <AddressForm
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
            saved={state.formSaves[4]}
            unsave={() => state.setSaved(4, false)}
            submit={state.persistTerms}
            errors={state.termsErrors}
          />
          <Button
            className="editable-application-page__button"
            action={state.createNewApplication}
            text="Create new application"
          />
        </>
      </Spoiler>
    </div>
  );
}
