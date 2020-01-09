import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Factory } from "./service/abstract.service";
import { DebugService } from "./service/debug.service";
import { serviceFactory } from "./service/service.factory";
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
  providers: [ DebugService, {
    provide: Factory,
    useFactory: serviceFactory,
    deps: [HttpClient, ActivatedRoute],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

