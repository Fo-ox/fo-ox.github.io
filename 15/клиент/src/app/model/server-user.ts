export interface IserverUser {
  readonly id: number;
  name: string;
  surname: string;
  patronymic: string;
  date: Date;
  points: number;
  group: string;
  phone: string;
  email: string;
  adress: string;
}

export class ServerUser implements IserverUser {
  private readonly _id: number;
  private _name: string;
  private _surname: string;
  private _patronymic?: string;
  private _date: Date;
  private _points?: number;
  private _group?: string;
  private _phone?: string;
  private _email?: string;
  private _adress?: string;

  constructor(Id: number, Dates: Date, Name: string, Surname: string, Patronymic?: string, Points?: number, Group?: string, Phone?: string, Email?: string, Adress?: string) {
    this._id = Id;
    this._date = Dates;
    this._name = Name;
    this._surname = Surname;
    if (Patronymic) {
      this._patronymic = Patronymic;
    }
    if (Group) {
      this._group = Group;
    }
    if (Points) {
      this._points = Points;
    }
    if (Phone) {
      this._phone = Phone;
    }
    if (Email) {
      this._email = Email;
    }
    if (Adress) {
      this._adress = Adress;
    }
  }
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get patronymic(): string {
    return this._patronymic;
  }

  set patronymic(value: string) {
    this._patronymic = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  get group(): string {
    return this._group;
  }

  set group(value: string) {
    this._group = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get adress(): string {
    return this._adress;
  }

  set adress(value: string) {
    this._adress = value;
  }
}
