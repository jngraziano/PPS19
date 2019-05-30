import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActionSheetController, 
         ToastController,
         LoadingController   } from '@ionic/angular';




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

  public username: string;
  public password: string;

  splash = true;
  spinner:boolean ; 

  ionViewDidEnter() 
  {
    setTimeout(() => this.splash = false, 5700);
  }

  // private firebaseAuthentication: FirebaseAuthentication,
  constructor( 
              public loadingController: LoadingController,
              private auth: AuthService, private router: Router,
              public toastController: ToastController,
              public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async creoToast(rta: boolean) {

    if(rta == true)
    {
      const toast = await this.toastController.create({
        message: 'Autenticación exitosa.',
        color: 'dark',
        showCloseButton: false,
        position: 'top',
        closeButtonText: 'Done',
        duration: 2000 
      });
  
      toast.present();


    }
    else{
      const toast = await this.toastController.create({
        message: 'Usuario/contraseña incorrectos.',
        color: 'dark',
        showCloseButton: false,
        position: 'top',
        closeButtonText: 'Done',
        duration: 2000 
      });
  
      toast.present();

    }
   
      
  }


  async creoSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ingresar como ...',
      cssClass: 'actSheet',
      buttons: [{
        text: 'admin',
        icon: 'build',
        handler: () => {
          
          this.username = "admin@gmail.com";
          this.password= "admin1111";

        }
      }, {
        text: 'invitado',
        icon: 'body',
        handler: () => {
          this.username = "invitado@gmail.com";
          this.password= "invitado2222";
        }
      }, {
        text: 'usuario',
        icon: 'sad',
        handler: () => {
          this.username = "usuario@gmail.com";
          this.password= "usuario3333";
        }
      }, {
        text: 'anonimo',
        icon: 'logo-snapchat',
        handler: () => {
          this.username = "anonimo@gmail.com";
          this.password= "anonimo4444";
        }
      },{
        text: 'tester',
        icon: 'phone-portrait',
        handler: () => {
          this.username = "tester@gmail.com";
          this.password= "tester5555";
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'btnCancel',
        role: 'cancel',
        handler: () => {
         
        }
      }]
    });
    await actionSheet.present();
  }
 
  login()
  {
    this.spinner = true; 
      
      this.auth.loginUser(this.username,this.password ).then((user) => {
      
        setTimeout(() => this.spinner = false , 5000);

      this.creoToast(true);  
      this.router.navigateByUrl('/tabs'); 
      }
      ) 
      .catch(err=>{
        
        this.creoToast(false);  
      });
  }



  }
