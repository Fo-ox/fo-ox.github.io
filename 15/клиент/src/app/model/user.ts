import { Contact } from "./contact";
import { Status } from "./status";

export interface Iuser {
  readonly id: number;
  name: string;
  surname: string;
  patronymic: string;
  date: Date;
  points: number;
  group: string;
  contact: Contact;
  status?: Status;
}

export class User implements Iuser {
  private readonly _id: number;
  private _name: string;
  private _surname: string;
  private _patronymic?: string;
  private _date: Date;
  private _points?: number;
  private _group?: string;
  private _contact?: Contact;
  private _status: Status;

  constructor (Id: number, Dates: Date, Contacts: Contact, Name: string, Surname: string, Patronymic?: string, Points?: number, Group?: string) {
    this._id = Id;
    this._date = Dates;
    this._name = Name;
    this._surname = Surname;
    this._contact = Contacts;
    Patronymic ? this._patronymic = Patronymic : this._patronymic = "-";
    Group  ? this._group = Group : this._group = "-";
    Points ? this._points = Points : this._points = 0;
    this._status = new Status();
  }


  get id (): number {
    return this._id;
  }

  get name (): string {
    return this._name;
  }
  set name (Name: string) {
    this._name = Name;
  }

  get surname (): string {
    return this._surname;
  }
  set surname (Surname: string) {
    this._surname = Surname;
  }

  get patronymic (): string {
    return this._patronymic;
  }
  set patronymic (Patronymic: string) {
    this._patronymic = Patronymic;
  }

  get group (): string {
    return this._group;
  }
  set group (Patronymic: string) {
    this._group = Patronymic;
  }

  get date (): Date {
    return this._date;
  }
  set date (Dates: Date) {
    this._date = Dates;
  }

  get contact(): Contact {
    return this._contact;
  }
  set contact(value: Contact) {
    this._contact = value;
  }

  get points(): number {
    return this._points;
  }
  set points(value: number) {
    this._points = value;
  }

  get status(): Status {
    return this._status;
  }
  set status(value: Status) {
    this._status = value;
  }
}
