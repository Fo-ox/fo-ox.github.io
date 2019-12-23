import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomDirective } from "../directives/custom.directive";
import { DateAgePipe } from "../pipes/date-age.pipe";
import { UserAddAndUpdateFormsModule } from "./user-add-and-update-forms/user-add-and-update-forms.module";
import { ViewsUserTableComponent } from "./views-user-table.component";

@NgModule({
  declarations: [
    ViewsUserTableComponent,
    CustomDirective,
    DateAgePipe,
  ],
  exports: [
    ViewsUserTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserAddAndUpdateFormsModule,
  ],
  providers: [],
})
export class ViewsUserTableModule { }

