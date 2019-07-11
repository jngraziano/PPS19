import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Agregadas:
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

import { AuthService } from "../app/auth.service";

// export const firebaseConfig = {
//   apiKey: "AIzaSyD4EV28tAjiq_k2sqf_lYzjP7elor5eqOE",
//   authDomain: "ppslogindata.firebaseapp.com",
//   databaseURL: "https://ppslogindata.firebaseio.com",
//   projectId: "ppslogindata",
//   storageBucket: "ppslogindata.appspot.com",
//   messagingSenderId: "794910733526"
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    //estos los agregue yo:
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    //Instaladas =>
    TranslateService,
    FirebaseAuthentication,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Gyroscope,
    DeviceMotion,
    NativeAudio,
    Flashlight,
    Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
