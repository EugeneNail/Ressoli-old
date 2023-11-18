import { ContractFormFields } from "../components/form/contract-form";

export default class ApplicationPayload {
  readonly clientId: number = 0;
  readonly addressId: number = 0;
  readonly applicableId: number = 0;
  readonly photoIds: number[] = [];
  readonly price: number = 0;
  readonly hasVat: boolean = false;
  readonly hasMortgage: boolean = false;
  readonly contract: string = "";

  constructor(
    clientId: number,
    addressId: number,
    applicableId: number,
    photoIds: number[],
    contract: ContractFormFields
  ) {
    this.clientId = clientId;
    this.addressId = addressId;
    this.applicableId = applicableId;
    this.photoIds = photoIds;
    this.price = contract.price;
    this.hasMortgage = contract.hasMortgage;
    this.hasVat = contract.hasVat;
    this.contract = contract.contract;
  }
}
