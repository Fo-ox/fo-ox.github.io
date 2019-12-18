import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ControlService } from "../../controller/control.service";
import { TestData } from "../../data/test-data";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.less"]
})
export class FormsComponent implements OnInit {
  @Input() private _currentList: TestData;
  @Input() private _userList: TestData;
  @Input() private _userPoints: object;
  @Input() private _userAge: object;
  @Input() private _currentUserId: number;
  showDialogForm: boolean = false;

  formsAddUser: FormGroup;

  @Output() currentListChange = new EventEmitter();
  @Output() userListChange = new EventEmitter();
  @Output() userAgeChange = new EventEmitter();
  @Output() userPointsChange = new EventEmitter();
  @Output() currentUserIdChange = new EventEmitter();

  constructor(private controlService: ControlService) {
  }

  ngOnInit(): void {
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

  get currentUserId(): number {
    return this._currentUserId;
  }

  set currentUserId(value: number) {
    this._currentUserId = value;
  }

  ViewDialogForm(): void {
    this.formsAddUser.reset();
    this._currentUserId = null;
    this.showDialogForm = true;
  }

  showDialogueForm(): void {
    this.showDialogForm = false;
  }

  // FORMS
  FormSubmit(): void {
    this.currentUserId ?
      this.userList = this.controlService.addFormUser(this.userList, this.formsAddUser, this.currentUserId) :
      this.userList = this.controlService.addFormUser(this.userList, this.formsAddUser);
    this.currentList = this.userList;
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    this.showDialogueForm();
    this.currentListChange.emit(this.currentList);
    this.userListChange.emit(this.userList);
    this.userAgeChange.emit(this.userAge);
    this.userPointsChange.emit(this.userPoints);
  }

  ViewDialogFormUpdate(value: number, GoList: TestData): void {
    this.currentList = GoList;
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
    this.currentUserId = value;
    this.currentUserIdChange.emit(this._currentUserId);
    this.showDialogForm = true;
  }
}
