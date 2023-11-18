export class Timestamp {
  private date: Date = new Date();

  constructor(date: Date) {
    this.date = new Date(date);
  }

  getTraditionalDate(): string {
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
    return `${this.date.getDay()} ${months[this.date.getMonth()]} ${this.date.getFullYear()}г`;
  }
}
