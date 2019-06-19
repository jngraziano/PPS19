import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Camera, CameraOptions, PictureSourceType } from "@ionic-native/Camera/ngx";

import * as firebase from "firebase";




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imagen:any;
  captureDataUrl: Array<string>;
  hayFotos: boolean = false;
  cantidadFotos: number = 0;
  usuarioLogueado: any;

  
  constructor( 
              public router: Router,
              public toastController: ToastController,
              public camera: Camera){

                this.captureDataUrl = new Array<string>();
                this.usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));


              }

  async logoff(){


    const toast = await this.toastController.create({
      message: 'Sesion Finalizada.',
      color: 'dark',
      showCloseButton: false,
      position: 'top',
      closeButtonText: 'Done',
      duration: 2000 
    });

    toast.present();

    this.router.navigateByUrl('/login'); 

  }

  mainM(){
    this.router.navigateByUrl('/tabs'); 

  }

  capturar(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture( options )
    .then( (imageData) => {
      // this.imagen=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.captureDataUrl.push('data:image/jpeg;base64,' + imageData);
      this.hayFotos = true;
      this.cantidadFotos += 1;

    })
    .catch(error =>{
      console.error( error );
    });


  }

  guardaImg(){

    let storageRef = firebase.storage().ref();
    let errores: number = 0;
    let contador: number = 0;

    this.captureDataUrl.forEach(foto => {
      let filename: string = this.usuarioLogueado.correo + "_" + contador;
      const imageRef = storageRef.child(`cosasLindas/${filename}.jpg`);

      // let datos: any = { 'nombre': this.nombre, 'apellido': this.apellido, 'DNI': this.DNI, 'CUIL': this.CUIL , 'perfil': this.perfil, 'correo': this.correo, 'clave': this.clave };
      // console.log(datos);
      // this.guardardatosDeDueSup(datos);
      // let storageRef = firebase.database().ref('usuarios/');
      // let imageData = storageRef.push();
      // imageData.set(datos);

      imageRef.putString(foto, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      })
        .catch(() => {
          errores++;
        });
    });

  }
  
}
