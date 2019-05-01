import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imagen:any;
  
  constructor( 
              public router: Router,
              public toastController: ToastController,
              public camera: Camera){}

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
      let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture( options )
    .then( (imageData) => {
      this.imagen=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    })
    .catch(error =>{
      console.error( error );
    });
  }
  
}
