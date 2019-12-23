import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAddAndUpdateFormsComponent } from "./user-add-and-update-forms.component";

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
})
export class UserAddAndUpdateFormsModule { }

