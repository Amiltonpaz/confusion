import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from "@ionic/storage";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(),
    BrowserAnimationsModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [SplashScreen, StatusBar, LocalNotifications, EmailComposer, SocialSharing,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: 'BaseURL', useValue: baseURL }],
  bootstrap: [AppComponent],
})
export class AppModule {}
