import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getDatabase, ref, set, push, update } from "firebase/database";

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
    @Input() chat: any;
	@Input() chatId: string;
    @Input() user: any;

	isEmojiPickerVisible: boolean = false

    message = new FormControl();
    constructor(){
    }

    sendMessage(){
		if(this.chat!=undefined){
			const db = getDatabase();
			let d = new Date(); 
			d.getHours(); 
			d.getMinutes(); 

			let url = `chats/${this.chatId}/messages/${this.chat.messages.length.toString()}`;
			let ref2 = ref(db, url);

			set(ref2, {
				message: this.message.value,
				senderId: this.user.uid,
				time: `${d.getHours()}:${String("0" + d.getMinutes().toString()).slice(-2)}`
			});
		}
		this.message.reset();
	}

	public addEmoji(event: any) {
		if(this.message.value != null){
			this.message.setValue(`${this.message.value}${event.emoji.native}`);
		}else{
			this.message.setValue(`${event.emoji.native}`);
		}
		this.isEmojiPickerVisible = false;
	 }
}
