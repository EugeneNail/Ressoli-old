import { FC, useState } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors, ClientFormFields } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors, AddressFormFields } from "../../../components/form/address-form";
import useFormState from "../../../service/use-form-state";
import api from "../../../service/api";
import PlotForm, { PlotFormErrors, PlotFormFields } from "../../../components/form/plot-form";
import PhotoForm from "../../../components/form/photo-form";

const NewPlotPage: FC = () => {
  const client = useFormState(new ClientFormFields(), new ClientFormErrors());
  const address = useFormState(new AddressFormFields(), new AddressFormErrors());
  const plot = useFormState(new PlotFormFields(), new PlotFormErrors());
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const confirmClient = async () => {
    const response = await api.post("/clients/confirm", client.fields);
    if (response.status >= 400) {
      client.setErrors(response.data.errors);
      return;
    }
    if (response.status == 200) {
      client.fields.id = response.data;
    }
    if (response.status == 204) {
      client.fields.id = 0;
    }
    next();
  };

  const confirmAddress = async () => {
    const response = await api.post("/addresses/confirm", address.fields);
    if (response.status >= 400) {
      address.setErrors(response.data.errors);
      return;
    }
    if (response.status == 200) {
      address.fields.id = response.data;
    }
    if (response.status == 204) {
      address.fields.id = 0;
    }
    next();
  };

  const confirmPlot = async () => {
    const response = await api.post("/applications/plots/confirm", plot.fields);
    if (response.status >= 400) {
      plot.setErrors(response.data.errors);
      return;
    }
    next();
  };

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={confirmClient} state={client} />,
    <AddressForm back={() => back()} submit={confirmAddress} state={address} />,
    <PlotForm back={() => back()} submit={confirmPlot} state={plot} />,
    <PhotoForm back={() => back()} submit={confirmPlot} photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} />,
    <div>Contract</div>,
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
};

export default NewPlotPage;
