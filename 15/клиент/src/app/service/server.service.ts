import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServerUser } from "../model/server-user";
import { Factory } from "./abstract.service";

@Injectable({providedIn: "root"})
export class ServerService extends Factory {

  constructor(private httpClient: HttpClient) {
    super();
    this.Load$.subscribe((res) => {
      this.loading = <boolean>res;
    });
  }

  // ------ Methods for views-user-table-component ------ //

  public getAllUserList(): Observable<ServerUser[]> {
    console.log("go in the Server service");
    return this.httpClient.get(this.URL) as Observable<ServerUser[]>;
  }

  public getUserId(userId: number): Observable<ServerUser> {
    return this.httpClient.get(this.URL + "/" + userId) as Observable<ServerUser>;
  }

  public deleteUser(userId: number): Observable<ServerUser[]> {
    return this.httpClient.delete(this.URL + "/" + userId) as Observable<ServerUser[]>;
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
    return id ? this.httpClient.put(this.URL,
      {
        id: id,
        name: newUser.get("profiles").get("name").value,
        surname: newUser.get("profiles").get("surname").value,
        patronymic: newUser.get("profiles").get("patronymic").value,
        date: new Date(`${newUser.get("date").value}`),
        points: +newUser.get("property").get("point").value,
        group: newUser.get("property").get("group").value,
        phone: newUser.get("contact").get("phone").value,
        email: newUser.get("contact").get("email").value,
        adress: newUser.get("contact").get("adres").value,
      }) as Observable<ServerUser[]> : this.httpClient.post(this.URL,
      {
        name: newUser.get("profiles").get("name").value,
        surname: newUser.get("profiles").get("surname").value,
        patronymic: newUser.get("profiles").get("patronymic").value,
        date: new Date(`${newUser.get("date").value}`),
        points: +newUser.get("property").get("point").value,
        group: newUser.get("property").get("group").value,
        phone: newUser.get("contact").get("phone").value,
        email: newUser.get("contact").get("email").value,
        adress: newUser.get("contact").get("adres").value,
      }) as Observable<ServerUser[]>;
  }

  // Guard method
  public userMayBeChange(userId: number, router: Router): Promise<boolean> {
    return new Promise<boolean> ( resolve => {
      this.getUserId(userId).subscribe( res => {
        if (!res) {
          router.navigate(["/error"]); resolve(false);
        } else if (res.points === 5) {
          router.navigate(["/"]);
          resolve(false);
          alert("Нельзя редактировать пользователя с оценкой 5 !");
        } else {
          resolve(true);
        }
      });
    });
  }
}
