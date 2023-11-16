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
    const response = await api.post("/clients", client.fields);

    if (response.status === 400 || response.status === 409) {
      client.setErrors(response.data.errors);
      return;
    }

    if (response.status === 200 || response.status === 201) {
      client.fields.id = response.data;
    }

    next();
  };

  const confirmAddress = async () => {
    const response = await api.post("/addresses", address.fields);

    if (response.status === 422) {
      address.setErrors(response.data.errors);
      return;
    }

    if (response.status == 200 || response.status == 201) {
      address.fields.id = response.data;
    }

    next();
  };

  const confirmPlot = async () => {
    const response = await api.post("/plots", plot.fields);

    if (response.status >= 400) {
      plot.setErrors(response.data.errors);
      return;
    }

    if (response.status == 201) {
      plot.fields.id = response.data;
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
