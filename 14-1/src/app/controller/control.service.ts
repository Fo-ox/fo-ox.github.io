import { Injectable } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { TestData } from "../data/test-data";
import { Contact } from "../model/contact";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class ControlService {

  // constructor() { }

  getAllUserList(): TestData {
    return TestData.studentList;
  }

  searchId(list: TestData, id: number): User {
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      if (user.id === id) {
        return user;
      }
      j++;
    }
  }

  searchNameOrFamily(list: TestData, query: string): object {
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

  filterStudent(list: TestData, points: number, age: number): TestData {
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

  uniquePoinst(list: TestData): object {
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

  uniqueAge(list: TestData): object {
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

  badModeOn(list: TestData): object {
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

  detele(list: TestData, id: number): object {
    const returnArray = [];
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      if (user.id !== id) {
        returnArray.push(user);
      }
      j++;
    }
    return returnArray;
  }

  sortList(list: TestData, sortType: string): object {
    const returnArray = [];
    let j = 0;
    while (list[j]) {
      const user: User = list[j];
      returnArray.push(user);
      j++;
    }
    // ------
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

  // VALIDATORS
  dateValid(date: FormGroup): { [key: string]: boolean } {
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

  nameValid(prolile: FormGroup): { [key: string]: boolean } {
    const name = prolile.get("name").value;
    const surname = prolile.get("surname").value;
    const patronymic = prolile.get("patronymic").value;
      if ((name === surname || name === patronymic) && name) {
        return {"nameValid": true};
      }
    return null;
  }

  addFormUser(list: TestData, newUser: FormGroup, id?: number): TestData {
    const returnArray = [];
    if (id) {
      let i = 0;
      while (list[i]) {
        const user: User = list[i];
        if (user.id === id) {
          user.name =  newUser.get("profiles").get("name").value;
          user.surname = newUser.get("profiles").get("surname").value;
          user.patronymic = newUser.get("profiles").get("patronymic").value;
          user.date = new Date(`${newUser.get("date").value}`);
          user.points = +newUser.get("property").get("point").value;
          user.group = newUser.get("property").get("group").value;
          user.contact.phone = newUser.get("contact").get("phone").value;
          user.contact.email = newUser.get("contact").get("email").value;
          user.contact.adress = newUser.get("contact").get("adres").value;
        }
        returnArray.push(user);
        i++;
      }
    } else {
      let listSize: number = 0;
      let maxindex: number = 0;
      while (list[listSize]) {
        const user: User = list[listSize];
        if (maxindex < user.id) {
          maxindex = user.id;
          returnArray.push(user);
        }
        listSize++;
      }
      returnArray.push(
        new User(
          maxindex + 1,
          new Date(`${newUser.get("date").value}`),
          new Contact(maxindex + 1,
            newUser.get("contact").get("phone").value,
            newUser.get("contact").get("email").value,
            newUser.get("contact").get("adres").value),
          newUser.get("profiles").get("name").value,
          newUser.get("profiles").get("surname").value,
          newUser.get("profiles").get("patronymic").value,
          +newUser.get("property").get("point").value,
          newUser.get("property").get("group").value));
      // console.log(listSize);
      // console.log(maxindex);
      // console.log(returnArray);
      // console.log(newUser.get("date").value);
    }
    return returnArray;
  }


}
