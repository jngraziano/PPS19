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
  imagenes: Array<string>;
  imagenesLindas : any;


  constructor(
              // private navParams: NavParams,
              public navCtrl: NavController,
              public router: Router,
              public baseService: FirebaseService,
              public toastController: ToastController) {
                this.imagenes = new Array<string>();
                this.traerImagenes();
              }
  // galleryType = 'pinterest';

  ngOnInit() {
    // this. getSomeText();
    // this.imagen = this.navParams.get('img');
   

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



   traerImagenes() {

     this.baseService.getItems('cosasLindasEdificio').then( ped => {
      this.imagenesLindas = ped;
      console.log(ped);
      for (let index = 0; index < this.imagenesLindas.length; index++) {
        // const element = this.imagenesLindas[index];
              // this.captureDataUrl.push('data:image/jpeg;base64,' + imageData);

        let promise = this.traerFoto(this.imagenesLindas[index].nombreFile);
      //  this.imagenes.imagen =  this.traerFoto(this.imagenesLindas[index].nombreFile);
        //  this.imagenarray.imagen = ;

        Promise.resolve(promise)
        .then(url => {
          console.log(index);
          // this.imagen = url;
          this.imagenes.push(url);

        });
         
        // await this.traerFoto(this.imagenesLindas[index].nombreFile);
      }
    
      // console.log(this.imagenesLindas[0].nombreFile);

      
     

    });  
  }

 traerFoto(nombre:string){
    // nombre = nombre.replace(' ', '_');
    let storageRef = firebase.storage().ref();
    console.log(nombre);
    const imageRef = storageRef.child('1relVis/CosasLindas/' + nombre + '.jpg');
    return imageRef.getDownloadURL();
  }
   
  
  


}
