import { useState } from "react";
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
import HouseForm, { HouseFormErrors } from "../../../components/form/house-form";
import { House } from "../../../model/house";

function CreateHousePage() {
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const house = useFormState(new House(), new HouseFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());

  function clientSubmit() {
    ApplicationService.persistClient(client, next);
  }

  function addressSubmit() {
    ApplicationService.persistAddress(address, next);
  }

  function applicableSubmit() {
    ApplicationService.persistApplicable("/houses/", house, next);
  }

  async function create() {
    if (await ApplicationService.checkContractValidity(contract)) {
      ApplicationService.createApplication(
        "/houses",
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
    <ContractForm back={() => back()} submit={create} willCreate state={contract} />,
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

export default CreateHousePage;
