import { Component, OnInit } from '@angular/core';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
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

   
  private username: string;
  private password: string;

  splash = true;
  spinner:boolean; 


  ionViewDidEnter() 
  {
    setTimeout(() => this.splash = false, 5000);
  }

 
  constructor(private firebaseAuthentication: FirebaseAuthentication, private auth: AuthService, private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController
    ) { }

ngOnInit() {
}

async creoToast(rta: boolean) {

  if(rta == true)
  {
    const toast = await this.toastController.create({
      message: 'Autenticación exitosa.',
      color: 'success',
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
      color: 'danger',
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

  this.auth.loginUser(this.username,this.password ).then((user) => {
    
    setTimeout(() => this.spinner = false , 2000);

  this.creoToast(true);  
  this.router.navigateByUrl('/tabs'); 
  }
  ) 
  .catch(err=>{
    
    this.creoToast(false);  
  });
}

}
