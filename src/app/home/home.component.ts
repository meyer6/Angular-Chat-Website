import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { getDatabase, ref, onValue} from "firebase/database";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    chatNumber: number = 0;
    
    constructor(
        private route: ActivatedRoute, 
        public homeService: HomeService,
    ){}

    changeChatNumber(num: number){
        this.chatNumber = num
    }
    
    ngOnInit(){
        this.homeService.setUserUpdates()

		// this.route.paramMap.subscribe( params => {
        //     console.log(params.get('userId'))
        // });
    }
    ngOnDestroy(){
        this.homeService.removeListeners()
    }
}


