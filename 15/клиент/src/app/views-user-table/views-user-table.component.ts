import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { User } from "../model/user";
import { Factory } from "../service/abstract.service";
import { ControlService } from "../service/control.service";

@Component({
  selector: "app-views-user-table",
  templateUrl: "./views-user-table.component.html",
  styleUrls: ["./views-user-table.component.less", "./loader.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewsUserTableComponent implements OnInit {

  private Detect: Subscription;

  private _currentClass_tr: string;
  redPointStatus: boolean = false;
  showDialog: boolean = false;
  deletedUser: number = null;

  constructor(
    private controlService: ControlService,
    private urlService: Factory,
    // private debugService: DebugService,
    private cdr: ChangeDetectorRef,
    private router: Router) {}

  get currentClass_tr(): string { return this._currentClass_tr; }
  set currentClass_tr(cl: string) { this._currentClass_tr = cl; }

  public detect(): void {
    // this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 250);
  }

  ngOnInit(): void {
    this.urlService.loading = true;
    this.urlService.getAllUserList()
      .pipe(
        finalize(() => {
          this.urlService.loading = false;
          // this.detect();
        }))
      .subscribe( res => {
        this.urlService.currentList = this.urlService.userList = this.urlService.transpilatedModel(res, true);
        console.log("start data stream", this.urlService.userList);
        this.urlService.userPoints = this.urlService.uniquePoinst(this.urlService.userList);
        this.urlService.userAge = this.urlService.uniqueAge(this.urlService.userList);
        this.urlService.currentPoint = null;
        this.urlService.currentAge = null;
        this.currentClass_tr = null;
        this.urlService.currentUserId = null;
        this.detect();
      });
    this.Detect = this.urlService.Detect.subscribe(() => {
      this.urlService.loading = false;
      this.detect();
    });
    this.urlService.childComponentRenderCounter++;
  }

  // расскраска найденных юзеров
  onFind(value: string): void {
    this.urlService.searchNameOrFamily(this.urlService.currentList, value);
  }

  // Обработка попапа
  viewDialogue(value: number): void {
    this.router.navigate(["/"]);
    this.showDialog = true;
    this.deletedUser = value;
  }

  showDialogue(): void {
    this.showDialog = false;
    this.deletedUser = null;
    this.router.navigate(["/"]);
  }

  deleteUser(value: number): void {
    this.urlService.loading = true;
    this.urlService.deleteUser(value)
      .subscribe(
        () => {
          this.urlService.getAllUserList()
            .subscribe((resp) => {
              console.log("delete stream", resp);
              this.urlService.currentList = this.urlService.userList = this.urlService.transpilatedModel(resp, true);
              this.urlService.userAge = this.urlService.uniqueAge(this.urlService.userList);
              this.urlService.userPoints = this.urlService.uniquePoinst(this.urlService.userList);
              if (this.urlService.currentPoint) {
                this.urlService.onChangePoint(`${this.urlService.currentPoint}`);
              }
              if (this.urlService.currentAge) {
                this.urlService.onChangeAge(`${this.urlService.currentAge}`);
              }
              this.urlService.loading = false;
              // обновление после удаления
              if (this.urlService.currentList) { this.urlService.redPointOn(); }
              this.detect();
            });
        });
    this.showDialogue();
  }

  ViewDialogForm(): void {
    this.router.navigate(["/add"]);
    this.urlService.ViewDialogFormSubject.next();
  }

  ViewDialogFormUpdate(listId: number, currentList: User[]): void {
    this.router.navigate(["/edit", listId]);
    currentList = this.urlService.currentList;
    this.urlService.ViewDialogFormUpdateSubject.next({
      id: listId,
      currentList: currentList,
    });
  }
}
