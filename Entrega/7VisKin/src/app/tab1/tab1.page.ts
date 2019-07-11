import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
// import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

const STORAGE_KEY = 'my_images';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cosasLindas = "LINDAS";
  cosasFeas = "FEAS";
  clasificacion:string ;
  
  images = [];

  constructor(private camera: Camera, 
              public router: Router,
            
            
              public toastController: ToastController) {}



              greenB(){
                this.router.navigateByUrl('/tab2'); 
            
              }
              redB(){
                this.router.navigateByUrl('/tab3'); 
            
              }
            
                async presentToast(text) {
                  const toast = await this.toastController.create({
                      message: text,
                      position: 'bottom',
                      duration: 3000
                  });
                  toast.present();
                }
            

}
