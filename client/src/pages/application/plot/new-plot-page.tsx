import { useEffect, useState } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors } from "../../../components/form/address-form";
import { Address } from "../../../model/address";
import useFormState from "../../../service/use-form-state";
import api from "../../../service/api";
import PlotForm, { PlotFormErrors } from "../../../components/form/plot-form";
import { Plot } from "../../../model/plot";
import PhotoForm from "../../../components/form/photo-form";
import ContractForm, { ContractFormErrors } from "../../../components/form/contract-form";
import { Photo } from "../../../model/photo";
import ApplicationPayload from "../../../model/application-payload";
import { Contract } from "../../../model/contract";
import { Client } from "../../../model/client";
import { PlotOptions } from "../../../model/options/plot-options";
import { ApplicationOptions } from "../../../model/options/application-options";

function NewPlotPage() {
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const plot = useFormState(new Plot(), new PlotFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());
  const [options, setOptions] = useState(new ApplicationOptions<PlotOptions>());

  useEffect(() => {
    api.get("/options/application").then((response) => setOptions(response.data));
  }, []);

  async function confirmClient() {
    const response = await api.post("/clients", client.fields);

    if (response.status === 400 || response.status === 409) {
      client.setErrors(response.data.errors);
      return;
    }

    if (response.status === 200 || response.status === 201) {
      client.fields.id = response.data;
    }

    next();
  }

  async function confirmAddress() {
    const response = await api.post("/addresses", address.fields);

    if (response.status === 422) {
      address.setErrors(response.data.errors);
      return;
    }

    if (response.status == 200 || response.status == 201) {
      address.fields.id = response.data;
    }

    next();
  }

  async function confirmPlot() {
    const response = await api.post("/plots", plot.fields);

    if (response.status >= 400) {
      plot.setErrors(response.data.errors);
      return;
    }

    if (response.status == 201) {
      plot.fields.id = response.data;
    }

    next();
  }

  async function createPlotApplication() {
    const payload = new ApplicationPayload(
      client.fields.id,
      address.fields.id,
      plot.fields.id,
      photos.map((photo) => photo.id),
      contract.fields
    );
    const response = await api.post("/applications/plots", payload);

    if (response.status == 201) {
      alert("Created");
    }

    if (response.status >= 400) {
      contract.setErrors(response.data.errors);
    }
  }

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={confirmClient} state={client} />,
    <AddressForm options={options.address} back={() => back()} submit={confirmAddress} state={address} />,
    <PlotForm options={options.applicable} back={() => back()} submit={confirmPlot} state={plot} />,
    <PhotoForm back={() => back()} submit={() => next()} state={[photos, setPhotos]} />,
    <ContractForm options={options.contract} back={() => back()} submit={createPlotApplication} state={contract} />,
  ]);

  return (
    <div className="editable-application-page">
      <FormProgressBar
        className="editable-application-page__progress-bar"
        steps={steps.length}
        currentStep={currentStep}
        goTo={goTo}
      />
      <div className="form-container">
        <div className="container">{steps[currentStep]}</div>
      </div>
    </div>
  );
}

export default NewPlotPage;
