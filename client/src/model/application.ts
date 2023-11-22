import { Address } from "./address";
import { Client } from "./client";
import { Contract } from "./contract";
import { Photo } from "./photo";
import { Plot } from "./plot";
import { User } from "./user";

export class Application {
  id: number = 0;
  user: User = new User();
  client: Client = new Client();
  address: Address = new Address();
  applicable: Plot = new Plot();
  photos: Photo[] = [];
  contract: Contract = new Contract();
  date: Date = new Date();
}
