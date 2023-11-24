import { Contract } from "./contract";

export class EditableApplication {
  id: number = 0;
  clientId: number = 0;
  addressId: number = 0;
  applicableId: number = 0;
  photoIds: number[] = [];
  contract: Contract = new Contract();

  constructor(
    id: number,
    clientId: number,
    addressId: number,
    applicableId: number,
    photoIds: number[],
    contract: Contract
  ) {
    this.id = id;
    this.clientId = clientId;
    this.addressId = addressId;
    this.applicableId = applicableId;
    this.photoIds = photoIds;
    this.contract = contract;
  }
}