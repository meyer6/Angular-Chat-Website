import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountService } from './account/account.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Material components 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AccountGuard } from './account/guard/account.guard';
import { LogoutGuard } from './account/guard/logout.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChatCardComponent } from './home/SmallComponents/chat-card/chat-card.component';
import { ChatWindowComponent } from './home/chat-window/chat-window.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { Header1Component } from './home/SmallComponents/header1/header1.component';
import { ChatsListComponent } from './home/chats-list/chats-list.component';
import { MessageComponent } from './home/SmallComponents/message/message.component';
import { Header2Component } from './home/SmallComponents/header2/header2.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AddFriendCardComponent } from './home/SmallComponents/add-friend-card/add-friend-card.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    NotFoundComponent,
    ChatCardComponent,
    ChatWindowComponent,
    SidebarComponent,
    Header1Component,
    ChatsListComponent,
    MessageComponent,
    Header2Component,
    CreateAccountComponent,
    AddFriendCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    PickerModule,
    RouterModule.forRoot([
      { path: '', component: CreateAccountComponent, canActivate: [LogoutGuard]},
      { path: 'signin', component: SignInComponent, canActivate: [LogoutGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AccountGuard]},
      { path: '**', component: NotFoundComponent}
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

    // Material components
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
