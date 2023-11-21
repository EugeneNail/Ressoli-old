import { AddressOptions } from "./address-options";
import { PlotOptions } from "./plot-options";

export class ApplicationOptions<T extends PlotOptions | AddressOptions> {
  address: AddressOptions = new AddressOptions();
  applicable: T = {} as T;
  contract: string[] = [];
}
