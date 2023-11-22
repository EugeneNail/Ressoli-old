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
import { useParams } from "react-router";
import { Application } from "../../../model/application";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
      api.get<{ data: Application }>(`/applications/plots/${id}/edit`).then(({ data: { data } }) => {
        client.setData(data.client);
        address.setData(data.address);
        plot.setData(data.applicable);
        setPhotos(data.photos);
        contract.setData(data.contract);
        setLoading(false);
      });
    }
    api.get("/options/application").then((response) => setOptions(response.data));
  }, []);

  async function submitClient() {
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

  async function submitAddress() {
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

  async function submitPlot() {
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

  async function submitContract() {
    const response = await api.post("/applications/contract", contract.fields);

    if (response.status >= 400) {
      contract.setErrors(response.data.errors);
      return;
    }

    submitPlotApplication();
  }

  async function submitPlotApplication() {
    const payload = new ApplicationPayload(
      parseFloat(id || "0"),
      client.fields.id,
      address.fields.id,
      plot.fields.id,
      photos.map((photo) => photo.id),
      contract.fields
    );
    let response = null;

    if (willCreate) {
      response = await api.post("/applications/plots", payload);
    } else {
      response = await api.post("/applications/plots", payload);
    }

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
    <ClientForm submit={submitClient} state={client} />,
    <AddressForm options={options.address} back={() => back()} submit={submitAddress} state={address} />,
    <PlotForm options={options.applicable} back={() => back()} submit={submitPlot} state={plot} />,
    <PhotoForm back={() => back()} submit={() => next()} state={[photos, setPhotos]} />,
    <ContractForm options={options.contract} back={() => back()} submit={submitContract} willCreate state={contract} />,
  ]);

  return (
    <div className="editable-application-page">
      {isLoading && (
        <div className="editable-application-page__load-container">
          <FontAwesomeIcon className="editable-application-page__load-icon" icon={faSpinner} pulse />
          <p className="editable-application-page__load-text">Загрузка...</p>
        </div>
      )}
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
