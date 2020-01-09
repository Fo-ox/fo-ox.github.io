import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DebugService } from "./debug.service";
import { ServerService } from "./server.service";

export const serviceFactory = (http: HttpClient, route: ActivatedRoute) => {

  if (!!route.snapshot.queryParams["debug"]) {
     return new DebugService();
  }
  return new ServerService(http);
};
