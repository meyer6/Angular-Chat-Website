import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-chats-list',
    templateUrl: './chats-list.component.html',
    styleUrls: ['./chats-list.component.css']
})
export class ChatsListComponent {
    @Input() chats: any;
    @Input() groups: any;
	@Input() user: any;
	@Input() user2: any;

	@Input() chatNumber: any;

    @Output() chatNumberEvent = new EventEmitter<number>();

    name = new FormControl()
    id = new FormControl()
	valid: boolean = true
    pickChat(id: number){
        this.chatNumberEvent.emit(id)
    }

    addFriend(){
		this.valid = false;
        const db = getDatabase();
		if(this.id.value != this.user.uid.slice(0, 5)){
			onValue(ref(db, 'users'), (snapshot) => {
				const data = snapshot.val();

				let keys = Object.keys(data)
				for (let i=0; i<keys.length; i++){
					if (keys[i].slice(0, 5) == this.id.value){

						let user: any = Object.values(data)[i]
						if(user.displayName == this.name.value){
							this.valid = true
							onValue(ref(db, `users/${keys[i]}/requests`), (snapshot) => {
								let index = 0
								if(snapshot.exists()){
									const data = snapshot.val();
									index = data.length
								}
								console.log(`users/${keys[i]}/requests/${index}`)
								this.name.reset()
								this.id.reset()
								set(ref(db, `users/${keys[i]}/requests/${index}`), this.user.uid);
							}, {
								onlyOnce: true
							});
						}
					}
				}
			}, {
				onlyOnce: true
			});
		}
    }
}
