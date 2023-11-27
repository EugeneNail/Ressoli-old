import { AddressFormErrors } from "../components/form/address-form";
import { ApartmentFormErrors } from "../components/form/apartment-form";
import { ClientFormErrors } from "../components/form/client-form";
import { ContractFormErrors } from "../components/form/contract-form";
import { HouseFormErrors } from "../components/form/house-form";
import { PlotFormErrors } from "../components/form/plot-form";
import { Address } from "../model/address";
import { Apartment } from "../model/apartment";
import { Client } from "../model/client";
import { Contract } from "../model/contract";
import { FormState } from "../model/form-state";
import { House } from "../model/house";
import { Photo } from "../model/photo";
import { Plot } from "../model/plot";
import api from "./api";

export class ApplicationService {
  static async persistClient(client: FormState<Client, ClientFormErrors>, next: () => void) {
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

  static async persistAddress(address: FormState<Address, AddressFormErrors>, next: () => void) {
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

  static async checkContractValidity(contract: FormState<Contract, ContractFormErrors>): Promise<boolean> {
    const response = await api.post("/applications/check-validity", contract.fields);

    if (response.status === 422) {
      contract.setErrors(response.data.errors);
      return false;
    }
    return true;
  }

  static async persistApplicable(
    applicable:
      | FormState<Plot, PlotFormErrors>
      | FormState<House, HouseFormErrors>
      | FormState<Apartment, ApartmentFormErrors>,
    next: () => void
  ) {
    const response = await api.post("/plots", applicable.fields);

    if (response.status === 422) {
      applicable.setErrors(response.data.errors);
      return;
    }

    if (response.status === 201 || response.status === 200) {
      applicable.fields.id = response.data;
    }

    next();
  }

  static async createApplication(
    subRoute: string,
    clientId: number,
    addressId: number,
    applicableId: number,
    photos: Photo[],
    contract: Contract
  ) {
    const application = {
      clientId,
      addressId,
      applicableId,
      photos: photos.map((photo) => photo.id),
      hasMortgage: contract.hasMortgage,
      contract: contract.contract,
      hasVat: contract.hasVat,
      price: contract.price,
    };
    const response = await api.post("/applications" + subRoute, application);

    if (response.status >= 400) {
      //TODO заменить системой оповещений
      alert(400);
      return;
    }

    if (response.status == 201) {
      alert("Created");
    }
  }

  static async editApplication(
    subRoute: string,
    id: number,
    clientId: number,
    addressId: number,
    applicableId: number,
    photos: Photo[],
    contract: Contract
  ) {
    const application = {
      clientId,
      addressId,
      applicableId,
      photos: photos.map((photo) => photo.id),
      hasMortgage: contract.hasMortgage,
      contract: contract.contract,
      hasVat: contract.hasVat,
      price: contract.price,
    };
    console.log(application);
    const response = await api.put(`/applications${subRoute}/${id}`, application);

    if (response.status >= 400) {
      //TODO заменить системой оповещений
      alert(400);
      return;
    }

    if (response.status == 204) {
      alert("Edited");
    }
  }
}
