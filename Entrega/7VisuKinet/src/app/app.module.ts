import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Agregadas:
import { FirebaseService } from "../app/services/firebase.service";
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

// import { AuthService } from "../app/auth.service";


//FILE/CAMARA
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';


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
            // AngularFireAuthModule,
            HttpClientModule,
            IonicStorageModule.forRoot()
          
          ],

  providers: [
    StatusBar,
    SplashScreen,
    //Instaladas =>
    // TranslateService,
    Camera,
    File,
    FilePath,
    WebView,
    FirebaseService,
    Gyroscope,
    DeviceMotion,
    // AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
