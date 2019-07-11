import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastController,NavParams } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-tabimage',
  templateUrl: './tabimage.page.html',
  styleUrls: ['./tabimage.page.scss'],
})
export class TabimagePage implements OnInit {

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

  constructor( public navCtrl: NavController,
              public router: Router,
              public baseService: FirebaseService,
              public toastController: ToastController) {
                this.traerImagenesTodas();
               }

  ngOnInit() {
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


   await this.baseService.getItems('cosasEdificio').then(async lista => {
    let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
    let nombreUsuario = usuarioLogueado.correo;
    
    let flag = false;

    let imagenElegida = lista.find(imagen => imagen.nombreFile == nombreFile);
    let likes : number = parseInt(imagenElegida.likes)+1;

    // console.log(imagenElegida.votaciones);
    // console.log(imagenElegida.votaciones.flagAdmin);


  

    if(imagenElegida.votaciones.flagAdmin == true && nombreUsuario == "admin@gmail.com" || 
       imagenElegida.votaciones.flagAnonimo == true && nombreUsuario == "anonimo@gmail.com"  ||
      imagenElegida.votaciones.flagInvitado == true  && nombreUsuario == "invitado@gmail.com"  || 
      imagenElegida.votaciones.flagTester == true  && nombreUsuario == "tester@gmail.com"   ||
      imagenElegida.votaciones.flagUsuario == true  && nombreUsuario == "usuario@gmail.com"  
      )
    {
      
      this.creoToast(false);
      
    }
    else{

      let objetoVotos = imagenElegida.votaciones;
      
  
      switch (usuarioLogueado.correo) {
        case 'admin@gmail.com':
              objetoVotos.flagAdmin = true;
          
          break;
          case 'invitado@gmail.com':
               objetoVotos.flagInvitado = true;
          
            break;
            case 'usuario@gmail.com':
                objetoVotos.flagUsuario = true;
          
              break;
              case 'anonimo@gmail.com':
                  objetoVotos.flagAnonimo = true;
          
                break;
                case 'tester@gmail.com':
                    objetoVotos.flagTester = true;
          
                  break;
      
        default:
          break;
      }
  
      let objetoEnviar = {
        "votaciones": objetoVotos,
         "likes": likes,
       
       }
  
  
           // this.baseService.addItem('cosasEdificio/'+imagenElegida.key+'/'+'votaciones/', objetoVotos);
      this.baseService.updateItem('cosasEdificio', imagenElegida.key, objetoEnviar);  
      this.traerImagenesTodas();
  

    }

   });


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

async creoToast(rta: boolean) {

  if(rta == true)
  {
    const toast = await this.toastController.create({
      message: 'OK',
      color: 'dark',
      showCloseButton: false,
      position: 'top',
      // closeButtonText: 'Done',
      duration: 2000 
    });

    toast.present();


  }
  else{
    const toast = await this.toastController.create({
      message: 'Usted ya voto esta imagen',
      color: 'danger',
      showCloseButton: false,
      position: 'top',
      // closeButtonText: 'Done',
      duration: 2000 
    });

    toast.present();

  }
}
   
  
  

}
