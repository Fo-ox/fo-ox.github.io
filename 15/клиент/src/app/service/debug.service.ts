import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { DebugData } from "../data/debug-data";
import { ServerUser } from "../model/server-user";
import { Factory } from "./abstract.service";

@Injectable({providedIn: "root"})
export class DebugService extends Factory {
  // private readonly URL = ApiConfig.url + "/users";

  constructor() {
    super();
    this.Load$.subscribe((res) => {
      this.loading = <boolean>res;
    });
  }
  // ------ Methods for views-user-table-component ------ //

  public getAllUserList(): Observable<ServerUser[]> {
    console.log("go in the Debug service");
    return of(DebugData.studentList);
    // return this.httpClient.get(this.URL) as Observable<ServerUser[]>;
  }

  public getUserId(userId: number): Observable<ServerUser> {
    return of(this.server_findUserId(userId));
    // return this.httpClient.get(this.URL + "/" + userId) as Observable<ServerUser>;
  }

  public deleteUser(userId: number): Observable<ServerUser[]> {
    return of(this.server_deleteUserId(userId));
    // return this.httpClient.delete(this.URL + "/" + userId) as Observable<ServerUser[]>;
  }

  public addFormUser(newUser: FormGroup, id?: number): Observable<ServerUser[]> {
    this.Load$.next({load: true});
    if (newUser.get("profiles").get("patronymic").value === null) {
      newUser.get("profiles").get("patronymic").setValue(" ");
    }
    if (newUser.get("property").get("point").value === null) {
      newUser.get("property").get("point").setValue(0);
    }
    if (newUser.get("property").get("group").value === null) {
      newUser.get("property").get("group").setValue(" ");
    }
    if (newUser.get("contact").get("phone").value === null) {
      newUser.get("contact").get("phone").setValue(" ");
    }
    if (newUser.get("contact").get("email").value === null) {
      newUser.get("contact").get("email").setValue(" ");
    }
    if (newUser.get("contact").get("adres").value === null) {
      newUser.get("contact").get("adres").setValue(" ");
    }
    return id ? this.server_addAndUpdateUser(newUser, id) : this.server_addAndUpdateUser(newUser);
  }

  // Guard method
  public userMayBeChange(userId: number, router: Router): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let returnUser: ServerUser = null;
      DebugData.studentList.filter(
        (user: ServerUser) => {
          if (user.id === +userId) {
            returnUser = user;
          }
        });
      if (!returnUser) {
        router.navigate(["/error"]);
        resolve(false);
      } else if (returnUser.points === 5) {
        router.navigate(["/"]);
        resolve(false);
        alert("Нельзя редактировать пользователя с оценкой 5 !");
      } else {
        resolve(true);
      }
    });
  }

  // ------ server emulate methods ------//
  server_findUserId(userId: number): ServerUser {
    let returnUser: ServerUser = null;
    DebugData.studentList.filter(
      (user: ServerUser) => {
        if (user.id === userId) {
          returnUser = user;
        }
      });
    return returnUser;
  }

  server_deleteUserId(userId: number): ServerUser[] {
    console.log(userId);
    let returnUser: ServerUser[] = [];
    returnUser = DebugData.studentList.filter(
      (user: ServerUser) => {
        if (user.id === +userId) {
          return user;
        }
      });

    DebugData.studentList = DebugData.studentList.filter(user => user.id !== userId);
    console.log(DebugData.studentList);
    return returnUser;
  }

  server_addAndUpdateUser(newUser: FormGroup, userId?: number): Observable<ServerUser[]> {
    let returnUser: ServerUser[] = [];
    if (userId && newUser) {
      returnUser = DebugData.studentList.filter(
        (user: ServerUser) => {
          if (user.id === userId) {
            user.name = newUser.get("profiles").get("name").value;
            user.surname = newUser.get("profiles").get("surname").value;
            user.patronymic = newUser.get("profiles").get("patronymic").value;
            user.date = new Date(`${newUser.get("date").value}`);
            user.points = +newUser.get("property").get("point").value;
            user.group = newUser.get("property").get("group").value;
            user.phone = newUser.get("contact").get("phone").value;
            user.email = newUser.get("contact").get("email").value;
            user.adress = newUser.get("contact").get("adres").value;
          }
        });
    } else if (newUser) {
      const listSize: number = DebugData.studentList.length;
      let maxindex: number = 0;
      for (let i = 0; i < listSize; i++) {
        if (maxindex < DebugData.studentList[i].id) {
          maxindex = DebugData.studentList[i].id;
        }
      }
      const addUser: ServerUser = new ServerUser(
        maxindex + 1,
        new Date(`${newUser.get("date").value}`),
        newUser.get("profiles").get("name").value,
        newUser.get("profiles").get("surname").value,
        newUser.get("profiles").get("patronymic").value,
        +newUser.get("property").get("point").value,
        newUser.get("property").get("group").value,
        newUser.get("contact").get("phone").value,
        newUser.get("contact").get("email").value,
        newUser.get("contact").get("adres").value);
      DebugData.studentList.push(addUser);
      returnUser.push(addUser);
    }
    return of(returnUser);
  }
}
