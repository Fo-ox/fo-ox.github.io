interface Istat {
  findedUser?: string;
  badPoints?: boolean;
}

export class Status implements Istat {
  private _findedUser?: string;
  private _badPoints?: boolean;
  constructor() {
    this.findedUser = "default";
    this.badPoints = false;
  }

  get findedUser(): string {
    return this._findedUser;
  }

  set findedUser(value: string) {
    this._findedUser = value;
  }

  get badPoints(): boolean {
    return this._badPoints;
  }

  set badPoints(value: boolean) {
    this._badPoints = value;
  }
}
