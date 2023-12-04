import { Contract as Terms } from "./contract";

export class EditableApplication {
  id: number = 0;
  type: "house" | "plot" | "apartment" = "plot";
  clientId: number = 0;
  addressId: number = 0;
  applicableId: number = 0;
  photoIds: number[] = [];
  terms: Terms = new Terms();

  // constructor(id: number, clientId: number, addressId: number, applicableId: number, photoIds: number[], terms: Terms) {
  //   this.id = id;
  //   this.clientId = clientId;
  //   this.addressId = addressId;
  //   this.applicableId = applicableId;
  //   this.photoIds = photoIds;
  //   this.terms = terms;
  // }
}
