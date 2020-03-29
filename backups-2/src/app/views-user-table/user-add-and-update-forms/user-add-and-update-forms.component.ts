import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TestData } from "../../data/test-data";
import { ControlService } from "../../service/control.service";
import { OutputUserAddAndUpdateFormsComponent } from "./output-user-add-and-update-forms.component";

@Component({
  selector: "app-user-add-and-update-forms",
  templateUrl: "./user-add-and-update-forms.component.html",
  styleUrls: ["./user-add-and-update-forms.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddAndUpdateFormsComponent implements OnInit {

  @Input() currentlist: TestData;
  @Input() userlist: TestData;
  @Input() userpoints: number[];
  @Input() userage: number[];
  @Input() currentuserId: number;

  showDialogForm: boolean = false;
  formsAddUser: FormGroup;

  outputsDate = new OutputUserAddAndUpdateFormsComponent();
  @Output() outputs = new EventEmitter<OutputUserAddAndUpdateFormsComponent>();

  constructor(private controlService: ControlService) { }

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
    return this.userlist;
  }

  set userList(list: TestData) {
    this.userlist = list;
  }

  get currentList(): TestData {
    return this.currentlist;
  }

  set currentList(list: TestData) {
    this.currentlist = list;
  }

  get userPoints(): number[] {
    return this.userpoints;
  }

  set userPoints(list: number[]) {
    this.userpoints = list;
  }

  get userAge(): number[] {
    return this.userage;
  }

  set userAge(list: number[]) {
    this.userage = list;
  }

  get currentUserId(): number {
    return this.currentuserId;
  }

  set currentUserId(value: number) {
    this.currentuserId = value;
  }

  ViewDialogForm(): void {
    this.formsAddUser.reset();
    this.currentUserId = null;
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
    this.outputsDate.currentListChange = this.currentList;
    this.outputsDate.userListChange = this.userList;
    this.outputsDate.userAgeChange = this.userAge;
    this.outputsDate.userPointsChange = this.userPoints;
    this.outputs.emit(this.outputsDate);
  }

  ViewDialogFormUpdate(value: number, GoList: TestData): void {
    console.log(value);
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
    this.outputsDate.currentUserIdChange = value;
    this.outputs.emit(this.outputsDate);
    this.showDialogForm = true;
  }
}