import { TestData } from "../../data/test-data";

interface OutputUserAddAndUpdateFormsComponentI {
  currentListChange: TestData;
  userListChange: TestData;
  userAgeChange: number[];
  userPointsChange: number[];
  currentUserIdChange: number;
}

export class OutputUserAddAndUpdateFormsComponent implements OutputUserAddAndUpdateFormsComponentI {

  private _currentListChange: TestData;
  private _userListChange: TestData;
  private _userAgeChange: number[];
  private _userPointsChange: number[];
  private _currentUserIdChange: number;

  constructor () {
    this.currentListChange = null;
    this.userListChange = null;
    this.userAgeChange = null;
    this.userPointsChange = null;
    this.currentUserIdChange = null;
  }

  get currentListChange(): TestData {
    return this._currentListChange;
  }

  set currentListChange(value: TestData) {
    this._currentListChange = value;
  }

  get userListChange(): TestData {
    return this._userListChange;
  }

  set userListChange(value: TestData) {
    this._userListChange = value;
  }

  get userAgeChange(): number[] {
    return this._userAgeChange;
  }

  set userAgeChange(value: number[]) {
    this._userAgeChange = value;
  }

  get userPointsChange(): number[] {
    return this._userPointsChange;
  }

  set userPointsChange(value: number[]) {
    this._userPointsChange = value;
  }

  get currentUserIdChange(): number {
    return this._currentUserIdChange;
  }

  set currentUserIdChange(value: number) {
    this._currentUserIdChange = value;
  }
}
