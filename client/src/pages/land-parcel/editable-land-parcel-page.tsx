import { FormEvent } from "react";
import { ClientForm, ClientFormErrors } from "../../components/form/client-form";
import { Spoiler } from "../../components/spoler/spoiler";
import { useErrors } from "../../service/use-errors";
import "./editable-application-page.sass";
import api from "../../service/api";
import { AddressForm, AddressFormErrors } from "../../components/form/address-form";
import { LandParcelForm, LandParcelFormErrors } from "../../components/form/land-parcel-form";
import { TermsForm, TermsFormErrors } from "../../components/form/contract-form";

export function EditableLandParcelPage() {
  const clientErrors = useErrors(new ClientFormErrors());
  const addressErrors = useErrors(new AddressFormErrors());
  const landParcelErrors = useErrors(new LandParcelFormErrors());
  const termsErrors = useErrors(new TermsFormErrors());

  async function persistClient(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/clients", payload);
  }

  async function persistAddress(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/addresses", payload);
  }

  async function persistLandParcel(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/land-parcels", payload);
  }

  async function confirmTerms(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/applications/terms", payload);
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
      <Spoiler open title="Contract">
        <TermsForm submit={confirmTerms} errors={termsErrors} />
      </Spoiler>
    </div>
  );
}
