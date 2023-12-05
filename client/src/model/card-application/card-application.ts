import { CardLandParcel } from "./card-land-parcel";

export class CardApplication {
  id: number = 0;
  isActive: boolean = false;
  previewUrl: string = "";
  title: string = "";
  address: string = "";
  price: number = 0;
  type: string = "";
  applicable: CardLandParcel = new CardLandParcel();
  client: string = "";
  date: Date = new Date();
  contract: string = "";
}
