import { ChangeDetectionStrategy, Component, OnInit, Output } from "@angular/core";
import { TestData } from "../data/test-data";
import { ControlService } from "../service/control.service";

@Component({
  selector: "app-views-user-table",
  templateUrl: "./views-user-table.component.html",
  styleUrls: ["./views-user-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewsUserTableComponent implements OnInit {

  @Output () currentlist: TestData;
  @Output () userlist: TestData;
  @Output () userpoints: number[];
  @Output () userage: number[];
  @Output () currentuserId: number;
  private _currentPoint: number;
  private _currentAge: number;
  private _currentClass_tr: string;
  redPointStatus: boolean = false;
  showDialog: boolean = false;
  deletedUser: number = null;
  @Output() activeSort: string = "id";

  constructor(private controlService: ControlService) { }

  ngOnInit(): void {
    this.currentList = this.userList = this.controlService.getAllUserList();
    this.userPoints = this.controlService.uniquePoinst(this.userList);
    this.userAge = this.controlService.uniqueAge(this.userList);
    this.currentPoint = null;
    this.currentAge = null;
    this.currentClass_tr = null;
    this.currentUserId = null;
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
    return this.currentuserId;
  }

  set currentUserId(value: number) {
    this.currentuserId = value;
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
  // получение новых данных из компоненты ребенка
  currentListChange(count: TestData): void {
    this.currentList = count;
  }
  userListChange(count: TestData): void {
    this.userList = count;
  }
  userAgeChange(count: number[]): void {
    this.userAge = count;
    if (this.currentAge) {
      this.onChangeAge(`${this.currentAge}`);
    }
  }
  userPointsChange(count: number[]): void {
    this.userPoints = count;
    if (this.currentPoint) {
      this.onChangePoint(`${this.currentPoint}`);
    }
  }
  currentUserIdChange(count: number): void {
    this.currentUserId = count;
  }

  activeSortChange(count: string): void {
    this.activeSort = count;
  }
}
