import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { ActionSheetController, 
         ToastController
            } from '@ionic/angular';


import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  splash = true;
  spinner:boolean ; 
  usuarios: any[];
  cuenta: { usuario: string, password: string } = {
    usuario: '',
    password: ''
  };
  ionViewDidEnter() 
  {
    setTimeout(() => this.splash = false, 5700);
  }

  constructor(private router: Router,
              private baseService: FirebaseService,
              public actionSheetController: ActionSheetController,
              public toastController: ToastController,) { }

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
          
          this.cuenta.usuario = "admin@gmail.com";
          this.cuenta.password= "1111";

        }
      }, {
        text: 'invitado',
        icon: 'body',
        handler: () => {
          this.cuenta.usuario = "invitado@gmail.com";
          this.cuenta.password = "2222";
        }
      }, {
        text: 'usuario',
        icon: 'sad',
        handler: () => {
          this.cuenta.usuario = "usuario@gmail.com";
          this.cuenta.password = "3333";
        }
      }, {
        text: 'anonimo',
        icon: 'logo-snapchat',
        handler: () => {
          this.cuenta.usuario = "anonimo@gmail.com";
          this.cuenta.password= "4444";
        }
      },{
        text: 'tester',
        icon: 'phone-portrait',
        handler: () => {
          this.cuenta.usuario = "tester@gmail.com";
          this.cuenta.password= "5555";
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
    // console.log(this.cuenta);
    this.spinner = true; 
    this.baseService.getItems("Usuarios").then(users => {
      setTimeout(() => this.spinner = false, 2000);
      // console.log(this.usuarios);
      // console.log(users);

      this.usuarios = users;

      let usuarioLogueado = this.usuarios.find(elem => (elem.correo == this.cuenta.usuario && elem.clave == this.cuenta.password));
      // console.log(usuarioLogueado);
      // console.log(this.cuenta);
      if (usuarioLogueado !== undefined) {
        sessionStorage.setItem('Usuarios', JSON.stringify(usuarioLogueado));

        // this.events.publish('usuarioLogueado', usuarioLogueado.perfil);
        this.creoToast(true);
 
        this.router.navigateByUrl('/tabs'); 
      }
      else{
        this.creoToast(false);
      }
    });
  }
 

}
