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
              
                this.spinner = true;
                this.traerImagenesTodas();
                // this.traerImagenesLindas();
                // this.traerImagenesFeas();
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

  async traerImagenesTodas(){

    await this.baseService.getItems('cosasEdificio').then(async ped => {
      // this.imagenesLindas = ped;
      this.imagenesTodas = ped;



      for (let i = 0; i < this.imagenesTodas.length; i++) {
        const element = this.imagenesTodas[i];
        if(this.imagenesTodas[i].tipo == "cosalinda")
        {

          this.cardColor = "success";
          console.log(this.imagenesTodas[i].tipo);
        }
        else{

          this.cardColor = "danger";
          console.log(this.imagenesTodas[i].tipo);

  
        }
        
        
      }


     
     

      // this.imagenesLindas = this.imagenesLindas.filter(imagen => imagen.tipo == "cosalinda");
    
    });  

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

//  traerFoto(nombre:string){
//     // nombre = nombre.replace(' ', '_');
//     let storageRef = firebase.storage().ref();
//     console.log(nombre);
//     const imageRef = storageRef.child('1relVis/CosasLindas/' + nombre + '.jpg');
//     return imageRef.getDownloadURL();
//   }
   
  
  


}
