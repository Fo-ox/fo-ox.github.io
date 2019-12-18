import { User } from "./user";

interface IdataBase {
  table: User[];
}
export class DataBase implements IdataBase {
  private _table: User[];

  constructor (user: User[]) {
    this._table = user;
  }

  get table(): User[] {
    return this._table;
  }

  set table(value: User[]) {
    this._table = value;
  }
  addUser (user: User): void {
    const count = this._table.length;
    this._table[count] = user;
  }
  /*static pointsList = [
    user1.points,
    user2.points,
    user3.points,
    user4.points,
    user5.points,
    user6.points,
  ];
  static ageList = [
    user1.date.getFullYear(),
    user2.date.getFullYear(),
    user3.date.getFullYear(),
    user4.date.getFullYear(),
    user5.date.getFullYear(),
    user6.date.getFullYear(),
  ];*/
}
