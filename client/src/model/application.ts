import { Address } from "./address";
import { Client } from "./client";
import { LandParcel } from "./land-parcel";
import { Photo } from "./photo";

export class Application<T extends LandParcel> {
  id: number = 0;
  title: string = "";
  isActive: boolean = false;
  date: Date = new Date();
  price: number = 0;
  contract: string = "";
  client: Client = new Client();
  address: Address = new Address();
  photos: Photo[] = [];
  applicable: T = {} as T;
  hasVat: boolean = false;
  hasMortgage: boolean = false;
}
