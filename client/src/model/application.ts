import { Address } from "./address";
import { Client } from "./client";
import { LandParcel } from "./land-parcel";
import { Photo } from "./photo";
import { Terms } from "./terms";

export class Application<T extends LandParcel> {
  id: number = 0;
  isActive: boolean = false;
  date: Date = new Date();
  client: Client = new Client();
  address: Address = new Address();
  photos: Photo[] = [];
  applicable: T = {} as T;
  terms: Terms = new Terms();
}
