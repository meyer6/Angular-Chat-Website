import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, off, get, child, set} from "firebase/database";

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    user: User;
    user2: any;

    chats: Chat[] = [];
    chatIds: string[] = [];

	i: number = 0;
	loadCompleted: boolean = false;

    removeURLs: any[] = []
	db: any;
    constructor(){
        this.db = getDatabase();
    }

	setUserUpdates(){
        this.chats = []
        this.chatIds = []
        this.i = 0
        this.loadCompleted = false;

		const temp = localStorage.getItem('user')
        if (temp !== null){
            this.user = JSON.parse(temp);
            const userRef = ref(this.db);
            get(child(userRef, `users/${this.user.uid}`)).then((snapshot) => {
                if (snapshot.exists() == false) {
                    if (this.user.photoURL == undefined){
                        this.user.photoURL = "https://img.freepik.com/free-icon/user_318-790139.jpg"
                    }
                    const userRef = ref(this.db, 'users/' + this.user.uid)
                    set(userRef, {
                        chats: {
                            1: "NoChat"
                        },
                        photoURL: this.user.photoURL,
                        displayName: this.user.displayName
                    }).then(()=>{this.setUserListener()})
                }else{
                    this.setUserListener()
                }
            });
        }
	}
    setUserListener(){
        onValue(ref(this.db, 'users/' + this.user.uid), (snapshot) => {
            this.removeURLs.push('users/' + this.user.uid)
            const data = snapshot.val();
            this.user2 = data;

            this.setChatUpdater();
        });
    }

	setChatUpdater(){
        if(this.user2 != null){
            this.user2.chats.forEach((chatId: any) => {
                onValue(ref(this.db, 'chats/' + chatId), (snapshot) => {
                    this.removeURLs.push('chats/' + chatId)

                    const data = snapshot.val();
                    if (data != null){
                        this.editChats(chatId, data);
                    }
                });
                this.i++
            });
            if (this.i == 1){
                this.loadCompleted = true;
            }
        }
	}

    editChats(chatId: any, chat: any){
        let id: string;
        if(chat.users[1] != this.user.uid){
            id = chat.users[1]
        }else{
            id = chat.users[2]
        }
        onValue(ref(this.db, 'users/' + id), (snapshot) => {
            this.removeURLs.push('users/' + id)

            const data = snapshot.val();
            chat.logo = data.photoURL
            chat.name = data.displayName
			
			this.i--
			if (this.i <= 1){
				this.loadCompleted = true;
			}
        }) 

        if (this.chatIds.includes(chatId)){
            const index = this.chatIds.indexOf(chatId)
            this.chats[index] = chat
        }else{
            this.chats.push(chat)
            this.chatIds.push(chatId) 
        }
    }
    removeListeners(){
        const db = getDatabase();
        this.removeURLs.forEach((URL: string) => {
            off(ref(db, URL), "value")
        })
    }
}


export interface User {
    uid: string,
	email: string,
	displayName: string,
	photoURL: string
}

export interface User2 {
	displayName: string,
	photoURL: string,
	chats: string[],
}

export interface Chat {
	messages: Message[],
	users: string[]
}

export interface Message {
	message: string,
	senderId: string,
	time: string
}