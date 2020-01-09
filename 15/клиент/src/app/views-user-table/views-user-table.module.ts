import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomDirective } from "../directives/custom.directive";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { DateAgePipe } from "../pipes/date-age.pipe";
import { DebugService } from "../service/debug.service";
import { ServerService } from "../service/server.service";
import { UserAddAndUpdateFormsModule } from "./user-add-and-update-forms/user-add-and-update-forms.module";
import { ViewsUserTableComponent } from "./views-user-table.component";

@NgModule({
  declarations: [
    ViewsUserTableComponent,
    CustomDirective,
    DateAgePipe,
    ErrorPageComponent,
  ],
  exports: [
    ViewsUserTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserAddAndUpdateFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [ ServerService, DebugService ],
})
export class ViewsUserTableModule { }

