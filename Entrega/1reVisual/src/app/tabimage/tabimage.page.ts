import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastController,NavParams } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";


import * as firebase from 'firebase';


@Component({
  selector: 'app-tabimage',
  templateUrl: './tabimage.page.html',
  styleUrls: ['./tabimage.page.scss'],
})
export class TabimagePage {

  someTextUrl;
  selectedPhoto;
  loading;
  imagen : any;
  imagenes: [] = [];
  // imgInfo: Array<string>;
  imagenesLindas : any;
  imagenesFeas : any;
  spinner:boolean ; 




  constructor(
              // private navParams: NavParams,
              public navCtrl: NavController,
              public router: Router,
              public baseService: FirebaseService,
              public toastController: ToastController) {
              
                this.spinner = true;

                this.traerImagenesLindas();
                this.traerImagenesFeas();
                setTimeout(() => this.spinner = false , 3000);
              }
  // galleryType = 'pinterest';

  ngOnInit() {
    // this. getSomeText();
    // this.imagen = this.navParams.get('img');
    // this.traerImagenesLindas();
    // this.traerImagenesFeas();


  }
 
  // async logoff(){

  //   const toast = await this.toastController.create({
  //     message: 'Sesion Finalizada.',
  //     color: 'dark',
  //     showCloseButton: false,
  //     position: 'top',
  //     closeButtonText: 'Done',
  //     duration: 2000
  //   });

  //   toast.present();

  //   this.router.navigateByUrl('/login');

  // }

  // getSomeText() {
  //   firebase.storage().ref().child('1relVis/CosasLindas/').getDownloadURL()
  //     .then(response => this.someTextUrl = response)
  //     .catch(error => console.log('error', error))
  // }



   traerImagenesLindas() {

     this.baseService.getItems('cosasEdificio').then(ped => {
      this.imagenesLindas = ped;
      this.imagenesLindas = this.imagenesLindas.filter(imagen => imagen.tipo == "cosalinda");
    
    });  
  }
  traerImagenesFeas() {

    this.baseService.getItems('cosasEdificio').then(ped => {
     this.imagenesFeas = ped;
     this.imagenesFeas = this.imagenesFeas.filter(imagen => imagen.tipo == "cosafea");
   
   });  
 }

//  traerFoto(nombre:string){
//     // nombre = nombre.replace(' ', '_');
//     let storageRef = firebase.storage().ref();
//     console.log(nombre);
//     const imageRef = storageRef.child('1relVis/CosasLindas/' + nombre + '.jpg');
//     return imageRef.getDownloadURL();
//   }
   
  
  


}
