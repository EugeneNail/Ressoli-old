import { useEffect, useState } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors } from "../../../components/form/address-form";
import { Address } from "../../../model/address";
import useFormState from "../../../service/use-form-state";
import PlotForm, { PlotFormErrors } from "../../../components/form/plot-form";
import { Plot } from "../../../model/plot";
import PhotoForm from "../../../components/form/photo-form";
import ContractForm, { ContractFormErrors } from "../../../components/form/contract-form";
import { Photo } from "../../../model/photo";
import { Contract } from "../../../model/contract";
import { Client } from "../../../model/client";
import { ApplicationService } from "../../../service/application-service";
import api from "../../../service/api";
import { useParams } from "react-router";
import { Application } from "../../../model/application";
import Spinner from "../../../components/spinner/spinner";

function EditPlotPage() {
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const plot = useFormState(new Plot(), new PlotFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    api.get<{ data: Application<Plot> }>("/applications/plots/" + id).then(({ data: { data } }) => {
      client.setData(data.client);
      address.setData(data.address);
      plot.setData(data.applicable);
      setPhotos(data.photos);
      contract.setData(data.contract);
      setLoading(false);
    });
  }, []);

  function clientSubmit() {
    ApplicationService.persistClient(client, next);
  }

  function addressSubmit() {
    ApplicationService.persistAddress(address, next);
  }

  function applicableSubmit() {
    ApplicationService.persistApplicable("/plots", plot, next);
  }

  async function edit() {
    if (await ApplicationService.checkContractValidity(contract)) {
      ApplicationService.editApplication(
        "/plots",
        parseFloat(id as string),
        client.fields.id,
        address.fields.id,
        plot.fields.id,
        photos,
        contract.fields
      );
    }
  }

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={clientSubmit} state={client} />,
    <AddressForm back={() => back()} submit={addressSubmit} state={address} />,
    <PlotForm back={() => back()} submit={applicableSubmit} state={plot} />,
    <PhotoForm back={() => back()} submit={() => next()} state={[photos, setPhotos]} />,
    <ContractForm back={() => back()} submit={edit} willCreate state={contract} />,
  ]);

  return (
    <div className="editable-application-page">
      <>
        {isLoading && <Spinner />}
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
      </>
    </div>
  );
}

export default EditPlotPage;
