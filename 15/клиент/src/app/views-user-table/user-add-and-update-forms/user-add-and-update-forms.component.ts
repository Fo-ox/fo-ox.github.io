import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { User } from "../../model/user";
import { Factory } from "../../service/abstract.service";
import { ControlService } from "../../service/control.service";

@Component({
  selector: "[app-user-add-and-update-forms]",
  templateUrl: "./user-add-and-update-forms.component.html",
  styleUrls: ["./user-add-and-update-forms.component.less", "../loader.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddAndUpdateFormsComponent implements OnInit, OnDestroy {

  private ViewDialogFormSub: Subscription;
  private ViewDialogFormUpdateSub: Subscription;

  showDialogForm: boolean = false;
  formsAddUser: FormGroup;

  constructor(
    private controlService: ControlService,
    private urlService: Factory,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) {}

  detect(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 250);
    // this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.formsAddUser = new FormGroup({
      profiles: new FormGroup({
        surname: new FormControl("", [Validators.required, Validators.minLength(2)]),
        name: new FormControl("", [Validators.required, Validators.minLength(2)]),
        patronymic: new FormControl("", [Validators.minLength(2)]),
      }, [this.urlService.nameValid]),
      date: new FormControl("", [this.urlService.dateValid, Validators.required]),
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
    this.ViewDialogFormSub = this.urlService.ViewDialogFormSubject.subscribe(() => {
      this.ViewDialogForm();
    });
    this.ViewDialogFormUpdateSub = this.urlService.ViewDialogFormUpdateSubject.subscribe((res: {id: number, currentList: User[]}) => {
        this.ViewDialogFormUpdate(res.id);
    });
    this.route.params
      .subscribe( (params: Params) => {
        // отвечает за передачу данных при прямой маршрутизации в карточку юзера
      if (params.id) {
        this.urlService.currentUserId = +params.id;
        this.ViewDialogFormUpdate(+params.id);
      }
    });
    this.urlService.childComponentRenderCounter ++;
  }

  ViewDialogForm(): void {
    this.formsAddUser.reset();
    this.urlService.currentUserId = null;
    this.showDialogForm = true;
    // this.detect();
  }

  showDialogueForm(): void {
    this.router.navigate(["/"]);
    this.showDialogForm = false;
  }

  // FORMS
  FormSubmit(): void {
    this.urlService.addFormUser(this.formsAddUser, this.urlService.currentUserId)
      .subscribe(
        res => {
          this.urlService.getAllUserList()
            .pipe(
              finalize(() => {
                this.urlService.Load$.next( {load: false});
                this.urlService.Detect.next();
              }))
            .subscribe((resp) => {
              console.log("update srteam", resp);
              this.urlService.currentList = this.urlService.userList = this.urlService.transpilatedModel(resp, true);
              this.urlService.userAge = this.urlService.uniqueAge(this.urlService.userList);
              this.urlService.userPoints = this.urlService.uniquePoinst(this.urlService.userList);
              if (this.urlService.currentAge) { this.urlService.onChangeAge(`${this.urlService.currentAge}`); }
              if (this.urlService.currentPoint) { this.urlService.onChangePoint(`${this.urlService.currentPoint}`); }
              if (this.urlService.activeSort && this.urlService.currentList) { this.urlService.sorting(this.urlService.activeSort); }
              if (this.urlService.currentList) { this.urlService.redPointOn(); }
              this.urlService.currentUserId = null;
            });
        });
    this.showDialogueForm();
  }

  ViewDialogFormUpdate(value: number): void {
    this.urlService.currentUserId = value;
    this.urlService.getUserId(this.urlService.currentUserId)
      .subscribe((res) => {
        const currentUser: User = this.urlService.transpilatedUser(res, false);
        this.urlService.currentUserId = value;
        this.formsAddUser.get("profiles").get("name").setValue(currentUser.name);
        this.formsAddUser.get("profiles").get("surname").setValue(currentUser.surname);
        if (currentUser.patronymic === " ") { currentUser.patronymic = null; }
        this.formsAddUser.get("profiles").get("patronymic").setValue(currentUser.patronymic);
        this.formsAddUser.get("date").setValue(`${currentUser.date.getFullYear()}-${("0" + (+currentUser.date.getMonth() + 1)).slice(-2)}-${("0" + currentUser.date.getDate()).slice(-2)}`);
        if (currentUser.points === 0) { currentUser.points = null; }
        this.formsAddUser.get("property").get("point").setValue(currentUser.points);
        if (currentUser.group === " ") { currentUser.group = null; }
        this.formsAddUser.get("property").get("group").setValue(currentUser.group);
        if (currentUser.contact.phone === " ") { currentUser.contact.phone = null; }
        this.formsAddUser.get("contact").get("phone").setValue(currentUser.contact.phone);
        if (currentUser.contact.email === " ") { currentUser.contact.email = null; }
        this.formsAddUser.get("contact").get("email").setValue(currentUser.contact.email);
        if (currentUser.contact.adress === " ") { currentUser.contact.adress = null; }
        this.formsAddUser.get("contact").get("adres").setValue(currentUser.contact.adress);

        if (this.urlService.currentAge) { this.urlService.onChangeAge(`${this.urlService.currentAge}`); }
        if (this.urlService.currentPoint) { this.urlService.onChangePoint(`${this.urlService.currentPoint}`); }
        if (this.urlService.activeSort && this.urlService.currentList) { this.urlService.sorting(this.urlService.activeSort); }
        if (this.urlService.currentList) { this.urlService.redPointOn(); }
        this.showDialogForm = true;
        // обновление формы после отрисовки и роутинга
        this.detect();
      });
    // console.log(value);
    // console.log(GoList);

  }

  ngOnDestroy(): void {
  this.ViewDialogFormSub.unsubscribe();
  this.ViewDialogFormUpdateSub.unsubscribe();
  // this.route.params.subscribe().unsubscribe();
  }
}
