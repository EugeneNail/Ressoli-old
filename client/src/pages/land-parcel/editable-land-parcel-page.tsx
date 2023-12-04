import { FormEvent } from "react";
import { ClientForm, ClientFormErrors } from "../../components/form/client-form";
import { Spoiler } from "../../components/spoler/spoiler";
import { useErrors } from "../../service/use-errors";
import "./editable-application-page.sass";
import api from "../../service/api";

export function EditableLandParcelPage() {
  const errors = useErrors(new ClientFormErrors());

  async function persistClient(event: FormEvent) {
    event?.preventDefault();
    const payload = new FormData(event.target as HTMLFormElement);
    const { data, status } = await api.post("/clients", payload);
  }

  return (
    <div className="editable-application-page">
      <h1 className="editable-application-page__header">New Land Parcel</h1>
      <Spoiler open title="Client">
        <ClientForm submit={persistClient} errors={errors} />
      </Spoiler>
    </div>
  );
}
