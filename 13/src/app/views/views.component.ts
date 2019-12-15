import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from "@angular/forms";
import { ControlService } from "../controller/control.service";
import { TestData } from "../data/test-data";
import { User } from "../model/user";

@Component({
  selector: "app-views",
  templateUrl: "./views.component.html",
  styleUrls: ["./views.component.less"]
})

export class ViewsComponent implements OnInit {
  private _userList: TestData;
  private _userPoints: object;
  private _userAge: object;
  private _currentPoint: number;
  private _currentAge: number;
  private _currentList: TestData;
  private _currentClass_tr: string;
  private _currentUserId: number;
  redPointStatus: boolean = false;
  showDialog: boolean = false;
  showDialogForm: boolean = false;
  deletedUser: number = null;
  activeSort: string = "id";

  // ---VAlid---
  formsAddUser: FormGroup;

  constructor(private controlService: ControlService) {

  }

  ngOnInit(): void {
    this.currentList = this.userList = this.controlService.getAllUserList();
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.currentPoint = null;
    this.currentAge = null;
    this.currentClass_tr = null;
    this.currentUserId = null;
    this.formsAddUser = new FormGroup({
      profiles: new FormGroup({
        surname: new FormControl("", [Validators.required, Validators.minLength(2)]),
        name: new FormControl("", [Validators.required, Validators.minLength(2)]),
        patronymic: new FormControl("", [Validators.minLength(2)]),
      }, [this.controlService.nameValid]),
      date: new FormControl("", [this.controlService.dateValid, Validators.required]),
      property: new FormGroup({
        group: new FormControl(""),
        point: new FormControl("", [Validators.pattern("^[0-9.]{1,4}$")]),
      }),
      contact: new FormGroup({
        phone: new FormControl("", [Validators.pattern("^[0-9()-]{1,15}$")]),
        email: new FormControl("", [Validators.email]),
        adres: new FormControl(""),
      }),
    });
  }

  get userList(): TestData {
    return this._userList;
  }

  set userList(list: TestData) {
    this._userList = list;
  }

  get currentList(): TestData {
    return this._currentList;
  }

  set currentList(list: TestData) {
    this._currentList = list;
  }

  get userPoints(): TestData {
    return this._userPoints;
  }

  set userPoints(list: TestData) {
    this._userPoints = list;
  }

  get userAge(): TestData {
    return this._userAge;
  }

  set userAge(list: TestData) {
    this._userAge = list;
  }

  get currentPoint(): number {
    return this._currentPoint;
  }

  set currentPoint(point: number) {
    this._currentPoint = point;
  }

  get currentAge(): number {
    return this._currentAge;
  }

  set currentAge(age: number) {
    this._currentAge = age;
  }

  get currentClass_tr(): string {
    return this._currentClass_tr;
  }

  set currentClass_tr(cl: string) {
    this._currentClass_tr = cl;
  }

  get currentUserId(): number {
    return this._currentUserId;
  }

  set currentUserId(value: number) {
    this._currentUserId = value;
  }

  // расскраска найденных юзеров
  onFind(value: string): void {
    this.controlService.searchNameOrFamily(this.currentList, value);
  }

  // событие выбора
  onChangePoint(value: string): void {
    value === "Средний балл" ? this.currentPoint = null : this.currentPoint = +value;
    this.currentList = this.controlService.filterStudent(this.userList, this.currentPoint, this.currentAge);
    if (this.currentPoint === null && this.currentAge === null) {
      this.currentList = this.userList;
    }
    this.activeSort = "id";
  }

  onChangeAge(value: string): void {
    value === "Возраст" ? this.currentAge = null : this.currentAge = +value;
    this.currentList = this.controlService.filterStudent(this.userList, this.currentPoint, this.currentAge);
    if (this.currentPoint === null && this.currentAge === null) {
      this.currentList = this.userList;
    }
    this.activeSort = "id";
  }

  // Включение режима подсветки
  redPointOn(): void {
    this.currentList = this.controlService.badModeOn(this.currentList);
  }

  // Обработка попапа
  viewDialogue(value: number): void {
    this.showDialog = true;
    this.deletedUser = value;
  }

  showDialogue(): void {
    this.showDialog = false;
    this.deletedUser = null;
  }

  ViewDialogForm(): void {
    this.formsAddUser.reset();
    this._currentUserId = null;
    this.showDialogForm = true;
  }

  showDialogueForm(): void {
    this.showDialogForm = false;
  }

  deleteUser(value: number): void {
    this.userList = this.controlService.detele(this.userList, value);
    this.currentList = this.userList;
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    if (this.currentPoint) {
      this.onChangePoint(`${this.currentPoint}`);
    }
    if (this.currentAge) {
      this.onChangeAge(`${this.currentAge}`);
    }
    this.showDialogue();
  }

  // сортировка по выбранному столбцу //
  sorting(value: string): void {
    this.currentList = this.controlService.sortList(this.currentList, value);
    this.activeSort = value;
  }

  // FORMS

  FormSubmit(): void {
    this.currentUserId ?
      this.userList = this.controlService.addFormUser(this.userList, this.formsAddUser, this.currentUserId) :
      this.userList = this.controlService.addFormUser(this.userList, this.formsAddUser);
    this.currentList = this.userList;
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    if (this.currentPoint) {
      this.onChangePoint(`${this.currentPoint}`);
    }
    if (this.currentAge) {
      this.onChangeAge(`${this.currentAge}`);
    }
    this.showDialogueForm();
  }

  ViewDialogFormUpdate(value: number): void {
    const currentUser = this.controlService.searchId(this.currentList, value);
    this.formsAddUser.get("profiles").get("name").setValue(currentUser.name);
    this.formsAddUser.get("profiles").get("surname").setValue(currentUser.surname);
    this.formsAddUser.get("profiles").get("patronymic").setValue(currentUser.patronymic);
    this.formsAddUser.get("date").setValue(`${currentUser.date.getFullYear()}-${("0" + (+currentUser.date.getMonth() + 1)).slice(-2)}-${("0" + currentUser.date.getDate()).slice(-2)}`);
    this.formsAddUser.get("property").get("point").setValue(currentUser.points);
    this.formsAddUser.get("property").get("group").setValue(currentUser.group);
    this.formsAddUser.get("contact").get("phone").setValue(currentUser.contact.phone);
    this.formsAddUser.get("contact").get("email").setValue(currentUser.contact.email);
    this.formsAddUser.get("contact").get("adres").setValue(currentUser.contact.adress);
    this._currentUserId = value;
    this.showDialogForm = true;
  }
}

