import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Factory } from "../service/abstract.service";

@Injectable({providedIn: "root"})
export class Guard implements CanActivate {

  constructor(private urlService: Factory, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.urlService.userMayBeChange(route.params.id, this.router);
  }
}
