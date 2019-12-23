import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ViewsUserTableModule } from "./views-user-table/views-user-table.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsUserTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

