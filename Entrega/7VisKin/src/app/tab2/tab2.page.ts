import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";
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

  constructor( public router: Router,
    public toastController: ToastController,
    public camera: Camera,
    private baseService: FirebaseService) {
      this.captureDataUrl = new Array<string>();
      this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
      // console.log(this.usuarioLogueado);

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
correctOrientation: true
// sourceType: PictureSourceType.PHOTOLIBRARY
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
// let contador: number = 0;
let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
let date: Date = new Date();
let fechaSubida = {
dia: date.getDate(),
mes: date.getMonth(),
hora: date.getHours(),
minuto: date.getMinutes()
}

this.captureDataUrl.forEach(foto => {
let numeroRandom = Math.floor(Math.random() * Math.floor(1000000));

let filename: string = this.usuarioLogueado.correo + "_" + numeroRandom;
const imageRef = storageRef.child(`1relVis/CosasLindas/${filename}.jpg`);

let objetoVotaciones = {
flagAdmin: false,
flagAnonimo: false,
flagInvitado: false,
flagTester: false,
flagUsuario: false

}


let objetoEnviar = {
"nombreFile": filename,
"correo": usuarioLogueado.correo,
"fechaSubida": fechaSubida,
"tipo": "cosalinda",
"url": foto,
"votaciones": objetoVotaciones,
"likes": 0

}

this.baseService.addItem('cosasEdificio', objetoEnviar);

console.log(imageRef);
imageRef.putString(foto, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

})
.catch(() => {
errores++;
});
});

if (errores == 0)
this.creoToast(true);
else
this.creoToast(false);


}

async creoToast(rta: boolean) {

if(rta == true)
{
const toast = await this.toastController.create({
message: 'Imagenes subidas con exito.',
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
message: 'Error cargar imagen',
color: 'dark',
showCloseButton: false,
position: 'top',
closeButtonText: 'Done',
duration: 2000 
});

toast.present();

}
}

}
