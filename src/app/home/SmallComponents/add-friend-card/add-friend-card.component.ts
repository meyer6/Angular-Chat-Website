import { Component, Input } from '@angular/core';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';

@Component({
    selector: 'app-add-friend-card',
    templateUrl: './add-friend-card.component.html',
    styleUrls: ['./add-friend-card.component.css']
})
export class AddFriendCardComponent {
    @Input() request: string;
	@Input() user: any;
	user2: any;
	loaded: boolean = false;

	db: any = getDatabase();
	ngOnInit(){
		this.db = getDatabase();
		onValue(ref(this.db, 'users/' + this.request), (snapshot) => {
			const data = snapshot.val();
			this.user2 = data;
			this.loaded = true;
		})
	}
	remove(){
		onValue(ref(this.db, "users/" + this.user.uid + "/requests"), (snapshot) => {
			const data = snapshot.val();
			let requests = data.filter((x: any) => {
				return x !== this.request;
			});
			set(ref(this.db, "users/" + this.user.uid + "/requests"), requests);
		}, {
			onlyOnce: true
		});
	}
	addFriend(){
		let d = new Date(); 
		d.getHours(); 
		d.getMinutes(); 
		
		const chatRef = push(ref(this.db, "chats"));
		set(chatRef, {
			users: {
				1: this.user.uid,
				2: this.request
			},
			messages: {
				1: {
					message: "Hello!",
					senderId: this.user.uid,
					time: `${d.getHours()}:${String("0" + d.getMinutes().toString()).slice(-2)}`
				},
			}
		});

		onValue(ref(this.db, 'users/' + this.user.uid), (snapshot) => {
			const data = snapshot.val();
			set(ref(this.db, `users/${this.user.uid}/chats/${data.chats.length}`), chatRef.key);
		}, {
			onlyOnce: true
		});
		set(ref(this.db, `users/${this.request}/chats/${this.user2.chats.length}`), chatRef.key);
		this.remove()
	}
}
