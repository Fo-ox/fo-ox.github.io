interface Icontact {
  readonly id: number;
  phone?: string;
  email?: string;
  adress?: string;
}

export class Contact implements Icontact {
  private readonly _id: number;
  private _phone?: string;
  private _email?: string;
  private _adress?: string;

  constructor(id: number, phone?: string, email?: string, adress?: string) {
    this._id = id;
    this._phone = phone;
    this._email = email;
    this._adress = adress;
  }
  get id (): number {
    return this._id;
  }
  get phone (): string {
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
