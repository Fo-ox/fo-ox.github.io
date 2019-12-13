import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from "@angular/forms";
import { ControlService } from "../controller/control.service";
import { TestData } from "../data/test-data";

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
  redPointStatus: boolean = false;
  showDialog: boolean = false;
  showDialogForm: boolean = false;
  deletedUser: number = null;
  activeSort: string = "id";

  // ---VAlid---
  formsAddUser: FormGroup;
  profiles: FormGroup;
  surname: FormControl;
  name: FormControl;
  patronymic: FormControl;


  constructor(private controlService: ControlService) {

  }

  ngOnInit(): void {
    this.currentList = this.userList = this.controlService.getAllUserList();
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.currentPoint = null;
    this.currentAge = null;
    this.currentClass_tr = null;
    this.formsAddUser = new FormGroup({
      profiles: new FormGroup({
        surname: new FormControl("", [Validators.required, Validators.minLength(2)]),
        name: new FormControl("", [Validators.required, Validators.minLength(2)]),
        patronymic: new FormControl(""),
      }),
      date: new FormControl("2000-01-01"),
      property: new FormGroup({
        group: new FormControl(""),
        point: new FormControl(""),
      }),
      contact: new FormGroup({
        phone: new FormControl(""),
        email: new FormControl(""),
        adres: new FormControl(""),
      }),
    });
    this.profiles.setValidators(this.controlService.nameValid(this.surname, this.name, this.patronymic));
    // console.log(this.userList);
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

  // расскраска найденных юзеров
  onFind(value: string): void {
    console.log(this.controlService.searchNameOrFamily(this.currentList, value));
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
    this.showDialogForm = true;
  }

  showDialogueForm(): void {
    this.showDialogForm = false;
  }

  deleteUser(value: number): void {
    this.userList = this.controlService.detele(this.userList, value);
    this.currentList = this.userList;
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
    console.log(`form submits:`, this.formsAddUser);
    const FormAddUserData = {...this.formsAddUser.value};
    console.log(FormAddUserData);
  }
}
