import { FormControl, Validators } from '@angular/forms';

export class User {
    email: FormControl;
    displayName: FormControl;
    password: FormControl;
    constructor() {
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.displayName = new FormControl('', [Validators.required])
        this.password = new FormControl('', [Validators.required]);
    }
}