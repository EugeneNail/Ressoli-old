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

  static addressToStraight(address: Address): string {
    return `${address.city}, ${address.street}, ${address.houseNumber}`;
  }

  static addressToFull(address: Address): string {
    return `г. ${address.city}, ул. ${address.street}, д. ${address.houseNumber}`;
  }
}
