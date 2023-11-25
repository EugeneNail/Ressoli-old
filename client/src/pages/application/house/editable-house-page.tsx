import { useEffect, useState } from "react";
import "../editable-application-page.sass";
import ClientForm, { ClientFormErrors } from "../../../components/form/client-form";
import FormProgressBar from "../../../components/form-progress-bar/form-progress-bar";
import useMultiStepForm from "../../../service/use-multi-step-form";
import AddressForm, { AddressFormErrors } from "../../../components/form/address-form";
import { Address } from "../../../model/address";
import useFormState from "../../../service/use-form-state";
import api from "../../../service/api";
import PhotoForm from "../../../components/form/photo-form";
import ContractForm, { ContractFormErrors } from "../../../components/form/contract-form";
import { Photo } from "../../../model/photo";
import { Contract } from "../../../model/contract";
import { Client } from "../../../model/client";
import { ApplicationOptions } from "../../../model/options/application-options";
import { useParams } from "react-router";
import { Application } from "../../../model/application";
import { EditableApplication } from "../../../model/editable-application";
import Spinner from "../../../components/spinner/spinner";
import { House } from "../../../model/house";
import HouseForm, { HouseFormErrors } from "../../../components/form/house-form";
import { HouseOptions } from "../../../model/options/house-options";

type EditableHousePageProps = {
  willCreate?: boolean;
};

function EditableHousePage({ willCreate }: EditableHousePageProps) {
  const { id } = useParams<{ id: string }>();
  const client = useFormState(new Client(), new ClientFormErrors());
  const address = useFormState(new Address(), new AddressFormErrors());
  const house = useFormState(new House(), new HouseFormErrors());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const contract = useFormState(new Contract(), new ContractFormErrors());
  const [options, setOptions] = useState(new ApplicationOptions<HouseOptions>());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!willCreate) {
      setLoading(true);
      api.get<{ data: Application<House> }>(`/applications/${id}/edit`).then(({ data: { data } }) => {
        client.setData(data.client);
        address.setData(data.address);
        house.setData(data.applicable);
        setPhotos(data.photos);
        contract.setData(data.contract);
        setLoading(false);
      });
    }
    api.get("/options/application?type=house").then((response) => {
      setOptions(response.data);
      console.log(response.data);
    });
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

  async function persistHouse() {
    const response = await api.post("/houses", house.fields);

    if (response.status === 422) {
      house.setErrors(response.data.errors);
      return;
    }

    if (response.status === 201 || response.status == 200) {
      house.fields.id = response.data;
    }

    next();
  }

  async function checkContractValidity() {
    const response = await api.post("/applications/check-validity", contract.fields);

    if (response.status === 422) {
      contract.setErrors(response.data.errors);
      return;
    }

    submitHouseApplication();
  }

  async function submitHouseApplication() {
    const application = new EditableApplication(
      parseFloat(id || "0"),
      "house",
      client.fields.id,
      address.fields.id,
      house.fields.id,
      photos.map((photo) => photo.id),
      contract.fields
    );

    if (willCreate) {
      var response = await api.post("/applications", application);
    } else {
      var response = await api.post("/applications", application);
    }

    console.log(response.data);

    if (response.status >= 400) {
      console.log(response.data);
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
    <HouseForm options={options.applicable} back={() => back()} submit={persistHouse} state={house} />,
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

export default EditableHousePage;
