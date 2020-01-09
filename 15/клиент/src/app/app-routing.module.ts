import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { Guard } from "./guards/guard";
import { UserAddAndUpdateFormsComponent } from "./views-user-table/user-add-and-update-forms/user-add-and-update-forms.component";
import { ViewsUserTableComponent } from "./views-user-table/views-user-table.component";

const routes: Routes = [
  { path: "", component: ViewsUserTableComponent, children: [
      { path: "add", component: UserAddAndUpdateFormsComponent },
      { path: "edit/:id", component: UserAddAndUpdateFormsComponent, canActivate: [Guard]},
    ]},
  { path: "error", component: ErrorPageComponent },
  { path: "**", redirectTo: "/error" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
