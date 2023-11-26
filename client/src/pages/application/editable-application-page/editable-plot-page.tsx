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
import { Contract } from "../../../model/contract";
import { Client } from "../../../model/client";
import { PlotOptions } from "../../../model/options/plot-options";
import { ApplicationOptions } from "../../../model/options/application-options";
import { useParams } from "react-router";
import { Application } from "../../../model/application";
import { EditableApplication } from "../../../model/editable-application";
import Spinner from "../../../components/spinner/spinner";

type EditablePlotPageProps = {
  willCreate?: boolean;
};

function EditablePlotPage({ willCreate }: EditablePlotPageProps) {
  const { id } = useParams<{ id: string }>();
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const plot = useFormState(new Plot(), new PlotFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());
  const [options, setOptions] = useState(new ApplicationOptions<PlotOptions>());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!willCreate) {
      setLoading(true);
      api.get<{ data: Application<Plot> }>(`/applications/${id}/edit`).then(({ data: { data } }) => {
        client.setData(data.client);
        address.setData(data.address);
        plot.setData(data.applicable);
        setPhotos(data.photos);
        contract.setData(data.contract);
        setLoading(false);
      });
    }
    api.get("/options/application?type=plot").then((response) => setOptions(response.data));
  }, []);

  async function persistClient() {
    const response = await api.post("/clients", client.fields);

    if (response.status === 422 || response.status === 409) {
      client.setErrors(response.data.errors);
      return;
    }

    if (response.status === 200 || response.status === 201) {
      client.fields.id = response.data;
    }

    next();
  }

  async function persistAddress() {
    const response = await api.post("/addresses", address.fields);

    if (response.status === 422) {
      address.setErrors(response.data.errors);
      return;
    }

    if (response.status === 200 || response.status === 201) {
      address.fields.id = response.data;
    }

    next();
  }

  async function submitPlot() {
    const response = await api.post("/plots", plot.fields);

    if (response.status === 422) {
      plot.setErrors(response.data.errors);
      return;
    }

    if (response.status === 201 || response.status === 200) {
      plot.fields.id = response.data;
    }

    next();
  }

  async function checkContractValidity() {
    const response = await api.post("/applications/check-validity", contract.fields);

    if (response.status === 422) {
      contract.setErrors(response.data.errors);
      return;
    }

    submitPlotApplication();
  }

  async function submitPlotApplication() {
    const application = new EditableApplication(
      parseFloat(id || "0"),
      "plot",
      client.fields.id,
      address.fields.id,
      plot.fields.id,
      photos.map((photo) => photo.id),
      contract.fields
    );
    const response = await api.post("/applications", application);

    if (response.status >= 400) {
      //TODO заменить системой оповещений
      alert(400);
      return;
    }

    if (response.status == 201) {
      alert("Created");
    }

    if (response.status == 204) {
      alert("Edited");
    }
  }

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={persistClient} state={client} />,
    <AddressForm options={options.address} back={() => back()} submit={persistAddress} state={address} />,
    <PlotForm options={options.applicable} back={() => back()} submit={submitPlot} state={plot} />,
    <PhotoForm back={() => back()} submit={() => next()} state={[photos, setPhotos]} />,
    <ContractForm
      options={options.contract}
      back={() => back()}
      submit={checkContractValidity}
      willCreate
      state={contract}
    />,
  ]);

  return (
    <div className="editable-application-page">
      {isLoading && <Spinner className="editable-application-page__spinner" />}
      {!isLoading && (
        <>
          <FormProgressBar
            className="editable-application-page__progress-bar"
            steps={steps.length}
            currentStep={currentStep}
            goTo={goTo}
          />
          <div className="form-container">
            <div className="container">{steps[currentStep]}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditablePlotPage;
