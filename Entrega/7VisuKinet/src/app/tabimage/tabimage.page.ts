import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastController,NavParams } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

import * as firebase from 'firebase';


@Component({
  selector: 'app-tabimage',
  templateUrl: './tabimage.page.html',
  styleUrls: ['./tabimage.page.scss'],
})
export class TabimagePage {


  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any
  public accX:any;
  public accY:any;
  public accZ:any;
  public activar:boolean = true;
  public subscription;
  public estado;





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
              private gyroscope: Gyroscope,
              private deviceMotion: DeviceMotion,
              public toastController: ToastController) {
              
                // this.spinner = true;
                // this.traerImagenesTodas();
                this.traerImagenesLindas();
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






   async traerImagenesLindas() {

    this.spinner = true;
     await this.baseService.getItems('cosasEdificio').then(async ped => {
      this.imagenesLindas = ped;
      this.imagenesLindas = this.imagenesLindas.filter(imagen => imagen.tipo == "cosalinda");
    
    });  
    this.spinner = false;

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

activoAcelerometro()
  {
    this.Accelerometer();
    this.activar = !this.activar;
  }

  desactivoAcelerometro()
  {
    this.subscription.unsubscribe();
    this.activar = !this.activar;
  }


  Accelerometer(){
    this.subscription = this.deviceMotion.watchAcceleration({frequency:6000}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log("esta es el watch: ",acceleration);
      this.accX=acceleration.x;
      this.accY=acceleration.y;
      this.accZ=acceleration.z;


      //VERTICAL
      if( this.accY >= 9 ) {
         console.log("Está parado"); 
         this.estado="PARADO";
        //  this.luzFlash.switchOn();
         setTimeout(function() {this.luzFlash.switchOff();}, 3000);
        //  this.playVert();
        }

      //HORIZONTAL
      else if ( this.accZ >= 9) { 
        console.log("Está horizontal"); 
        this.estado="ACOSTADO";
        // this.playHoriz();
        // this.vibration.vibrate(5000);
        // setTimeout(function() {this.vibration.vibrate(0);}, 5000);
      }

      //IZQ
      else if ( this.accX >= 9) { 
        console.log("Está de costado IZQ"); 
        this.estado="IZQUIERDA";
        // this.playIzq();
      }
 
      //DER
      else if ( this.accX <= -9) {
         console.log("Está de costado DER"); 
         this.estado="DERECHA";
        //  this.playDer();
        }

      //RESTO
      else {
        console.log("-----Registro de Watch------ ");
    
      
      }
    });
    
  }
   
  
  


}
