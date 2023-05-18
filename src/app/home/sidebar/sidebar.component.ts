import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getDatabase, ref, set, push, update } from "firebase/database";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() drawer: any;
  @Input() user: any;
  @Input() user2: any;

  photoURL = new FormControl();
  changePhoto(){
    const db = getDatabase()
    console.log(`users/${this.user.uid}/photoURL`)
    set(ref(db, `users/${this.user.uid}/photoURL`), this.photoURL.value);
  }
}
