import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../user'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../account.component.css']
})
export class CreateAccountComponent {
  hide = true;
  user: User;

  constructor(public accountService: AccountService) {
      this.user = new User()
  }
}
