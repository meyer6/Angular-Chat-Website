import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from "../account.service";
import { Observable } from 'rxjs';
import { getDatabase, ref, push, set, onValue, child, get } from "firebase/database";

@Injectable({
    providedIn: 'root'
})
export class AccountGuard implements CanActivate {
    
    constructor(
        public accountService: AccountService,
        public router: Router
    ){ }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let user = JSON.parse(localStorage.getItem('user')!);
        if(user == null) {
            this.router.navigate(['signin'])
        }
        return true;
    }
}