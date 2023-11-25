import { ShortHouse } from "./short-house";
import { ShortPlot } from "./short-plot";

export class ShortApplication<T extends ShortHouse | ShortPlot> {
  id: number = 0;
  preview: string = "";
  contract: string = "";
  city: string = "";
  street: string = "";
  houseNumber: string = "";
  applicable: T = {} as T;
  price: number = 0;
  area: number = 0;
  date: Date = new Date();
}
