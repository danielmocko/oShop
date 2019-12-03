import { UserService } from "./user.service";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
    /*
    return this.authService.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()),
      map(appUser => appUser.isAdmin)
    );*/
  }
}
