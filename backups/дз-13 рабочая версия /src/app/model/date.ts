interface Idate {
  day: number;
  month: number;
  year: number;
}

export class MyDate implements Idate {
  private _day: number;
  private _month: number;
  private _year: number;
  constructor (Day: number, Month: number, Year: number) {
    this._day = Day;
    this._month = Month;
    this._year = Year;
  }
  get day (): number {
    return this._day;
  }
  set day (Day: number) {
    this._day = Day;
  }
  get month (): number {
    return this._month;
  }
  set month (Month: number) {
    this._month = Month;
  }
  get year (): number {
    return this._year;
  }
  set year (Year: number) {
    this._year = Year;
  }
  fullDateString (): string {
    let tmp: string;
    switch (this._month) {
      case 1 : { tmp = "Jan"; break; }
      case 2 : { tmp = "Feb"; break; }
      case 3 : { tmp = "Mar"; break; }
      case 4 : { tmp = "Apr"; break; }
      case 5 : { tmp = "May"; break; }
      case 6 : { tmp = "Jun"; break; }
      case 7 : { tmp = "Jul"; break; }
      case 8 : { tmp = "Aug"; break; }
      case 9 : { tmp = "Sep"; break; }
      case 10 : { tmp = "Oct"; break; }
      case 11 : { tmp = "Nov"; break; }
      case 12 : { tmp = "Dec"; break; }
    }
    return `${this._day} ${tmp} ${this._year}`;
  }
  getAge(): number {
    return 2019 - this._year;
  }
}
