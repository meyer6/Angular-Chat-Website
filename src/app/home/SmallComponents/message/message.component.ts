import { Component, Input } from '@angular/core';
import { getDatabase, ref, onValue} from "firebase/database";
import { MessageService } from './message.service'

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    @Input() message: any;
    @Input() user: any;
    logo: string;
    name: string;

    loadCompleted: boolean = false;

    db: any;
    constructor(){
        this.db = getDatabase();
    }

    ngOnInit(){
        if (this.message!= undefined){
            onValue(ref(this.db, 'users/' + this.message.senderId), (snapshot) => {
                const data = snapshot.val();
                this.logo = data.photoURL
                this.name = data.displayName
                this.loadCompleted = true
            }, {
				onlyOnce: true
			}); 
        }
    }
}
