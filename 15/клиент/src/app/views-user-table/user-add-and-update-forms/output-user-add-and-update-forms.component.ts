import { User } from "../../model/user";

interface OutputUserAddAndUpdateFormsComponentI {
  currentListChange: User[];
  userListChange: User[];
  userAgeChange: number[];
  userPointsChange: number[];
  currentUserIdChange: number;
  loading: boolean;
}

export class OutputUserAddAndUpdateFormsComponent implements OutputUserAddAndUpdateFormsComponentI {

  private _currentListChange: User[];
  private _userListChange: User[];
  private _userAgeChange: number[];
  private _userPointsChange: number[];
  private _currentUserIdChange: number;
  private _loading: boolean;

  constructor () {
    this.currentListChange = null;
    this.userListChange = null;
    this.userAgeChange = null;
    this.userPointsChange = null;
    this.currentUserIdChange = null;
    this.loading = null;
  }

  get currentListChange(): User[] {
    return this._currentListChange;
  }

  set currentListChange(value: User[]) {
    this._currentListChange = value;
  }

  get userListChange(): User[] {
    return this._userListChange;
  }

  set userListChange(value: User[]) {
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

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }
}
