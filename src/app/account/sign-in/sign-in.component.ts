import { Component, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../user'

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../account.component.css']
})

export class SignInComponent {
    hide = true;
    user: User;

    constructor(public accountService: AccountService) {
        this.user = new User()
    }
}
