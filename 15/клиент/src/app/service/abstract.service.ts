import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { ApiConfig } from "../api-config";
import { TestData } from "../data/test-data";
import { Contact } from "../model/contact";
import { ServerUser } from "../model/server-user";
import { User } from "../model/user";

@Injectable({providedIn: "root"})
export abstract class Factory {

  // ----- STREAM ---- //
  public ViewDialogFormSubject = new Subject();
  public ViewDialogFormUpdateSubject = new Subject();
  public Detect = new Subject();
  public Load$ = new Subject();

  // ----- @Input | @Output ---- //
  private _currentList: User[];
  private _userList: User[];
  private _userPoints: number[];
  private _userAge: number[];
  private _currentUserId: number;
  public loading: boolean = false;

  private _currentAge: number;
  private _currentPoint: number;
  private _activeSort: string = "id";
  public childComponentRenderCounter: number = 0;

  get currentList(): User[] { return this._currentList; }
  set currentList(value: User[]) { this._currentList = value; }

  get userList(): User[] { return this._userList; }
  set userList(value: User[]) { this._userList = value; }

  get userPoints(): number[] { return this._userPoints; }
  set userPoints(value: number[]) { this._userPoints = value; }

  get userAge(): number[] { return this._userAge; }
  set userAge(value: number[]) { this._userAge = value; }

  get currentUserId(): number { return this._currentUserId; }
  set currentUserId(value: number) { this._currentUserId = value; }

  get currentAge(): number { return this._currentAge; }
  set currentAge(value: number) { this._currentAge = value; }

  get currentPoint(): number { return this._currentPoint; }
  set currentPoint(value: number) { this._currentPoint = value; }

  get activeSort(): string { return this._activeSort; }
  set activeSort(value: string) { this._activeSort = value; }

  public readonly URL = ApiConfig.url + "/users";

  // ------ Methods for views-user-table-component ------ //

  abstract getAllUserList(): Observable<ServerUser[]>;
  abstract getUserId(userId: number): Observable<ServerUser>;
  abstract deleteUser(userId: number): Observable<ServerUser[]>;
  abstract addFormUser(newUser: FormGroup, id?: number): Observable<ServerUser[]>;
  // Guard method
  abstract userMayBeChange(userId: number, router: Router): Promise<boolean>;

  public transpilatedModel(resolve: ServerUser[] | ServerUser, status: boolean): User[] {
    const returnArray: User[] = [];
    let i = 0;
    while (resolve[i]) {
      returnArray.push(
        new User(resolve[i].id,
          new Date(resolve[i].date),
          new Contact(resolve[i].id,
            resolve[i].phone,
            resolve[i].email,
            resolve[i].adress ),
          resolve[i].name,
          resolve[i].surname,
          resolve[i].patronymic,
          resolve[i].points,
          resolve[i].group));
      if (status) {
        returnArray[i].status.findedUser = "default";
        returnArray[i].status.badPoints = false;
      }
      i++;
    }
    return returnArray;
  }

  public transpilatedUser(resolve: ServerUser | ServerUser, status: boolean): User {
    let returnUser: User;
    returnUser =
      new User(resolve.id,
        new Date(resolve.date),
        new Contact(resolve.id,
          resolve.phone,
          resolve.email,
          resolve.adress ),
        resolve.name,
        resolve.surname,
        resolve.patronymic,
        resolve.points,
        resolve.group);
    if (status) {
      returnUser.status.findedUser = "default";
      returnUser.status.badPoints = false;
    }
    return returnUser;
  }

  public uniquePoinst(list: TestData): number[] {
    let i = 0;
    const returnArray = [];
    while (list[i]) {
      const user: User = list[i];
      if (!returnArray.includes(user.points)) {
        returnArray.push(user.points);
      }
      i++;
    }
    return returnArray.sort();
  }

  public uniqueAge(list: TestData): number[] {
    let i = 0;
    const returnArray = [];
    while (list[i]) {
      const user: User = list[i];
      if (!returnArray.includes(user.date.getFullYear())) {
        returnArray.push(user.date.getFullYear());
      }
      i++;
    }
    return returnArray.sort();
  }

  public searchNameOrFamily(list: TestData, query: string): object {
    const returnArray = [];
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      if (user.name === query || user.surname === query) {
        returnArray.push(user.id);
        user.status.findedUser = "active";
      } else {
        user.status.findedUser = "default";
      }
      j++;
    }
    return returnArray;
  }

  public filterStudent(list: TestData, points: number, age: number): User[] {
    const returnArray = [];
    let j = 0;
    if (!points && !age) {
      while (list[j]) {
        const user: User = list[j]; //
        returnArray.push(user);
        j++;
      }
    } else {
      if (points && !age) {
        while (list[j]) {
          const user: User = list[j]; //
          if (user.points === points) {
            returnArray.push(user);
          }
          j++;
        }
      }
      if (age && !points) {
        while (list[j]) {
          const user: User = list[j]; //
          if (user.date.getFullYear() === age) {
            returnArray.push(user);
          }
          j++;
        }
      }
      if (points && age) {
        while (list[j]) {
          const user: User = list[j];
          if (user.points === points && user.date.getFullYear() === age) {
            returnArray.push(user);
          }
          j++;
        }
      }
      return returnArray;
    }
  }

  public badModeOn(list: User[]): User[] {
    const returnArray = [];
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      user.points <= 3 ? user.status.badPoints = true : user.status.badPoints = false;
      returnArray.push(user);
      j++;
    }
    return returnArray;
  }

  public sortList(list: User[], sortType: string): User[] {
    const returnArray = [];
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      returnArray.push(user);
      j++;
    }
    switch (sortType) {
      case "id": {
        returnArray.sort((a: User, b: User) => a.id < b.id ? -1 : 1);
        break;
      }
      case "name" : {
        returnArray.sort((a: User, b: User) => a.name < b.name ? -1 : 1);
        break;
      }
      case "surname" : {
        returnArray.sort((a: User, b: User) => a.surname < b.surname ? -1 : 1);
        break;
      }
      case "patronymic" : {
        returnArray.sort((a: User, b: User) => a.patronymic < b.patronymic ? -1 : 1);
        break;
      }
      case "age" : {
        returnArray.sort((a: User, b: User) =>
          +`${a.date.getFullYear()}${("0" + a.date.getMonth()).slice(-2)}${("0" + a.date.getDate()).slice(-2)}`
          < +`${b.date.getFullYear()}${("0" + b.date.getMonth()).slice(-2)}${("0" + b.date.getDate()).slice(-2)}` ? -1 : 1);
        break;
      }
      case "points" : {
        returnArray.sort((a: User, b: User) => a.points < b.points ? -1 : 1);
        break;
      }
      case  "group" : {
        returnArray.sort((a: User, b: User) => a.group < b.group ? -1 : 1);
        break;
      }
    }
    return returnArray;
  }

  // ------ Methods for user-add-and-update-forms-component ------ //

  public dateValid(date: FormGroup): { [key: string]: boolean } {
    const currentDate = new Date();
    const userDate = new Date(`${date.value}`);
    if (userDate) {
      if (+`${currentDate.getFullYear()}${("0" + currentDate.getMonth()).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}`
        - +`${userDate.getFullYear()}${("0" + userDate.getMonth()).slice(-2)}${("0" + userDate.getDate()).slice(-2)}` < 100000) {
        return {"dateValid": true};
      }
    } if (userDate.toDateString() === "Invalid Date") {
      return {"dateFormat": true};
    }
    return null;
  }

  public nameValid(prolile: FormGroup): { [key: string]: boolean } {
    const name = prolile.get("name").value;
    const surname = prolile.get("surname").value;
    const patronymic = prolile.get("patronymic").value;
    if ((name === surname || name === patronymic) && name) {
      return {"nameValid": true};
    }
    return null;
  }

  public searchId(list: User[], id: number): User {
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      if (user.id === id) {
        return user;
      }
      j++;
    }
  }

  // ------ render methods for component ------//

  // событие выбора
  public onChangePoint(value: string): void {
    value === "Средний балл" ? this.currentPoint = null : this.currentPoint = +value;
    this.currentList = this.filterStudent(this.userList, this.currentPoint, this.currentAge);
    if (this.currentPoint === null && this.currentAge === null) {this.currentList = this.userList; }
    if (this.activeSort) { this.sorting(this.activeSort); }
    this.redPointOn();
  }

  public onChangeAge(value: string): void {
    value === "Возраст" ? this.currentAge = null : this.currentAge = +value;
    this.currentList = this.filterStudent(this.userList, this.currentPoint, this.currentAge);
    if (this.currentPoint === null && this.currentAge === null) { this.currentList = this.userList; }
    if (this.activeSort) { this.sorting(this.activeSort); }
    this.redPointOn();
  }

  // Включение режима подсветки
  public redPointOn(): void {
    this.currentList = this.badModeOn(this.currentList);
  }

  // сортировка по выбранному столбцу //
  public sorting(value: string): void {
    this.currentList = this.sortList(this.currentList, value);
    this.activeSort = value;
  }
}
