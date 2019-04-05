import { Component, OnInit } from '@angular/core';
// import { IonicPage, NavController, MenuController } from 'ionic-angular';
// import {UserProvider} from "../../providers/user/user";
// import {HttpProvider} from "../../providers/http/http";
// import {User} from "../../models/user";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [FirebaseAuthentication, AuthService],
})
export class LoginPage implements OnInit {
   // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  // user = {
  //   email: 'ejemplo@ejemplo.com',
  //   password: 'ejem'
  // };

  private username: string;
  private password: string;

  // Our translated text strings
  private loginErrorString: string;
  private opt: string = 'signin';


  constructor(private firebaseAuthentication: FirebaseAuthentication, private auth: AuthService, private router: Router,
              public alertController: AlertController) { }

  ngOnInit() {
  }
 
  login()
  {
      
      // this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      this.auth.loginUser(this.username,this.password ).then((user) => {
      this.presentAlert(true);  
      this.router.navigateByUrl('/tabs'); 
      }
      ) 
      .catch(err=>{
        
        this.presentAlert(false);  
      });
  }

  async presentAlert(estado: boolean) {
   
    if(estado == true)
    {
      const alert = await this.alertController.create({
        header: 'Bienvenido.',
        subHeader: '',
        message: 'Autenticación exitosa.',
        buttons: ['OK']
      });
  
      await alert.present();
     

    }
    else{
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: '',
        message: 'Usuario/Contraseña incorrectos.',
        buttons: ['OK']
      });
  
      await alert.present();

    }

   
  }


  

  }
