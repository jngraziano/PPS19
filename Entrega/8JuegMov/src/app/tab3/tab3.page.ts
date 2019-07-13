import { Component, OnInit } from '@angular/core';

import { FirebaseService } from "../services/firebase.service";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  scoreTotal: any;
  constructor(
    // private navParams: NavParams,
  
    public baseService: FirebaseService
   ) {
    
      // this.spinner = true;
      // this.traerImagenesTodas();
      // this.traerImagenesLindas();
      // this.traerImagenesFeas();
      // setTimeout(() => this.spinner = false , 3000);




    }

    ngOnInit() {
      // this. getSomeText();
      // this.imagen = this.navParams.get('img');
      // this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
      // this.traerImagenesLindas();
      this.traerTabla();
   
  
    }


    async traerTabla(){

      // this.spinner = true;
  
      // await this.baseService.getItems('tablaKinetico').then(async ped => {
      //   this.scoreTotal = ped;
      // });  
      let correoActual = localStorage.getItem("correo");
      let puntajeActual = localStorage.getItem("puntaje");

      let objetoScore = {
        correo: correoActual,
        puntaje: puntajeActual
      }
      this.scoreTotal = objetoScore;
      // setTimeout(() => {
      //   this.spinner = false;
      // }, 2000);
    }
   
}
