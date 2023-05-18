import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from "../account.service";
import { Observable } from 'rxjs';
import { off, getDatabase, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    public accountService: AccountService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem('user')!);
    if(user !== null) {
      // const db = getDatabase();
      // off(ref(db, 'users/'+user.uid), "value")

      this.accountService.SignOut()
    }
    return true;
  }
}
