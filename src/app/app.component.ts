import { Component } from '@angular/core';
import { SignInComponent } from './account/sign-in/sign-in.component';
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],  
})

export class AppComponent {
}