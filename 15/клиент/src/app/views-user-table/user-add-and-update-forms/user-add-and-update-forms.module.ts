import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAddAndUpdateFormsComponent } from "./user-add-and-update-forms.component";
import { ServerService } from "../../service/server.service";

@NgModule({
  declarations: [
    UserAddAndUpdateFormsComponent,
  ],
  exports: [
    UserAddAndUpdateFormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ ServerService ],
})
export class UserAddAndUpdateFormsModule { }

