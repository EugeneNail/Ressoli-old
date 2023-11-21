import { Address } from "../model/address";

export class Converter {
  static dateToFull(date: Date): string {
    date = new Date(date);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}г`;
  }

  static addressToSearchable(address: Address): string {
    return `${address.city}, ${address.typeOfStreet} ${address.street}, ${address.houseNumber}`;
  }

  static addressToString(address: Address): string {
    return `${address.city}, ${address.street}, ${address.houseNumber}`;
  }

  static positionToReadable(position: string): number[] {
    return position.split(" ").map(parseFloat);
  }
}
