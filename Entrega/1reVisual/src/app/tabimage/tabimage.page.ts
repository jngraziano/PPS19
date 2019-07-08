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
  imagenesTodas : any;
  imagenesFeas : any;
  spinner:boolean ; 

 isenabled:boolean= false;
 cardColor: string;




  constructor(
              // private navParams: NavParams,
              public navCtrl: NavController,
              public router: Router,
              public baseService: FirebaseService,
              public toastController: ToastController) {
              
                // this.spinner = true;
                this.traerImagenesTodas();
                // this.traerImagenesLindas();
                // this.traerImagenesFeas();
                // setTimeout(() => this.spinner = false , 3000);
              }
  // galleryType = 'pinterest';

  ngOnInit() {
    // this. getSomeText();
    // this.imagen = this.navParams.get('img');
    // this.traerImagenesLindas();
    // this.traerImagenesFeas();


  }
 
 

  async traerImagenesTodas(){

    this.spinner = true;

    await this.baseService.getItems('cosasEdificio').then(async ped => {
      this.imagenesTodas = ped;
    });  
    this.spinner = false;
  }






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

 async like(nombreFile: any){
  //  alert(nombreFile);

   await this.baseService.getItems('cosasEdificio').then(async lista => {

    this.spinner= true;
    let imagenElegida = lista.find(imagen => imagen.nombreFile == nombreFile);
    let likes : number = parseInt(imagenElegida.likes)+1;
    // console.log(likes);
     let objetoEnviar = {
        // "correo": imagenElegida.correo,
        // "fechaElegida": imagenElegida.fechaElegida,
        // "nombreFile": imagenElegida.nombreFile,
        // "url":imagenElegida.url,
        // "tipo": imagenElegida.tipo,
        "likes": likes
      }

    this.baseService.updateItem('cosasEdificio', imagenElegida.key, objetoEnviar);  
    this.traerImagenesTodas();

   });

      // let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('usuario'));
      // await this.baseService.getItems('reservademesas').then(async lista => {
      // this.reservaRealizada = lista.find(cliente => cliente.correo == usuarioLogueado.correo);
      // let objetoEnviar = {
      //   "correo": usuarioLogueado.correo,
      //   "fechaElegida": this.fechaElegida,
      //   "mesaSeleccionada": this.mesaSeleccionada,
      //   "estadoConfirmacion": "pendiente"
      // }
      // if(this.reservaRealizada !== undefined)
      // {
      //   this.baseService.updateItem('reservademesas', this.reservaRealizada.key, objetoEnviar);  

      // }



 }

 ionRefresh(event) {
  setTimeout(() => {
    event.target.complete();
    // this.pedidos = [];
    // this.hayPedidosACerrar = false;
    this.traerImagenesTodas();
  }, 2000);
}

ionPull(event) {
  // Emitted while the user is pulling down the content and exposing the refresher.
  // console.log('ionPull Event Triggered!');

}
ionStart(event) {
  // Emitted when the user begins to start pulling down.
  // console.log('ionStart Event Triggered!');
}

//  traerFoto(nombre:string){
//     // nombre = nombre.replace(' ', '_');
//     let storageRef = firebase.storage().ref();
//     console.log(nombre);
//     const imageRef = storageRef.child('1relVis/CosasLindas/' + nombre + '.jpg');
//     return imageRef.getDownloadURL();
//   }
   
  
  


}
