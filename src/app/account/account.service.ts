import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class AccountService {
    userData: any; // Save logged in user data
    errorMessage: string = '';
    constructor(  
      public afs: AngularFirestore, 
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
    ) {
      /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
      this.afAuth.authState.subscribe((user) => {
        this.saveDataTOJSON(user);
      });
    }

    saveDataTOJSON(user: any){
      if (user && user.displayName!=undefined) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['home']);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    }
    // Sign in with email/password
    SignIn(email: string, password: string) {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user);
        })
        .catch((error) => {
            if (error.code == "auth/wrong-password"){
                this.errorMessage = "wrongPassword"
            }else if(error.code == "auth/user-not-found"){
                this.errorMessage = "emailNotFound"
            }
            window.alert(error.message);
        });
    }
    
    // Sign up with email/password
    SignUp(email: string, password: string, name: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((user: any) => {
          user.user.updateProfile({
            displayName: name
          }).then(() => {
            this.SetUserData(user.user);
            this.saveDataTOJSON(user.user)
          })
        })
        .catch((error) => {
            if (error.code == "auth/email-already-in-use"){
                this.errorMessage = "emailInUse"
            }else if(error.code == "auth/weak-password"){
                this.errorMessage = "weakPassword"
            }
            window.alert(error.message);
        });
    }

    // Sign in with Google
    GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider())
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.SetUserData(result.user);
          
        })
        .catch((error) => {
          window.alert(error);
        });
    }
    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      
      const userData: User2 = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      return userRef.set(userData, {
        merge: true,
      });
    }

    // Sign out
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      });
    }
}

export interface User2 {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}