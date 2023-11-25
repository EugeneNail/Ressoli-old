import { Address } from "./address";
import { Client } from "./client";
import { Contract } from "./contract";
import { Photo } from "./photo";
import { User } from "./user";

export class Application<T> {
  id: number = 0;
  user: User = new User();
  client: Client = new Client();
  address: Address = new Address();
  applicable: T = {} as T;
  photos: Photo[] = [];
  contract: Contract = new Contract();
  date: Date = new Date();
}
