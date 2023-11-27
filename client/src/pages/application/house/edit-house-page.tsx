import { useEffect, useState } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors } from "../../../components/form/address-form";
import { Address } from "../../../model/address";
import useFormState from "../../../service/use-form-state";
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
import { House } from "../../../model/house";
import HouseForm, { HouseFormErrors } from "../../../components/form/house-form";

function EditHousePage() {
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const house = useFormState(new House(), new HouseFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    api.get<Application<House>>("/applications/houses/" + id).then(({ data }) => {
      client.setData(data.client);
      address.setData(data.address);
      house.setData(data.applicable);
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
    ApplicationService.persistApplicable("/houses", house, next);
  }

  async function edit() {
    if (await ApplicationService.checkContractValidity(contract)) {
      ApplicationService.editApplication(
        "/houses",
        parseFloat(id as string),
        client.fields.id,
        address.fields.id,
        house.fields.id,
        photos,
        contract.fields
      );
    }
  }

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={clientSubmit} state={client} />,
    <AddressForm back={() => back()} submit={addressSubmit} state={address} />,
    <HouseForm back={() => back()} submit={applicableSubmit} state={house} />,
    <PhotoForm back={() => back()} submit={() => next()} state={[photos, setPhotos]} />,
    <ContractForm back={() => back()} submit={edit} state={contract} />,
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

export default EditHousePage;
