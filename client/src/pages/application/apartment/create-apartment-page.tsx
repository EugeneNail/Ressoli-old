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
import ApartmentForm, { ApartmentFormErrors } from "../../../components/form/apartment-form";
import { Apartment } from "../../../model/apartment";

function CreateApartmentPage() {
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const apartment = useFormState(new Apartment(), new ApartmentFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());

  function clientSubmit() {
    ApplicationService.persistClient(client, next);
  }

  function addressSubmit() {
    ApplicationService.persistAddress(address, next);
  }

  function applicableSubmit() {
    ApplicationService.persistApplicable("/apartments/", apartment, next);
  }

  async function create() {
    if (await ApplicationService.checkContractValidity(contract)) {
      ApplicationService.createApplication(
        "/apartments",
        client.fields.id,
        address.fields.id,
        apartment.fields.id,
        photos,
        contract.fields
      );
    }
  }

  const { steps, back, next, currentStep, goTo } = useMultiStepForm([
    <ClientForm submit={clientSubmit} state={client} />,
    <AddressForm back={() => back()} submit={addressSubmit} state={address} />,
    <ApartmentForm back={() => back()} submit={applicableSubmit} state={apartment} />,
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

export default CreateApartmentPage;
