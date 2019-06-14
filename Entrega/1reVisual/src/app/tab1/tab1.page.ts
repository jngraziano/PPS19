import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';


const STORAGE_KEY = 'my_images';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  cosasLindas = "LINDAS";
  cosasFeas = "FEAS";
  clasificacion:string ;
  
  images = [];

  constructor(
              private camera: Camera, 
              public router: Router,
              private file: File, 
              private webview: WebView,
              private storage: Storage, 
              private filePath: FilePath,
              public toastController: ToastController
             ){}

             ngOnInit() {
  
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

  greenB(){
    this.router.navigateByUrl('/tab2'); 

  }
  redB(){
    this.router.navigateByUrl('/tab3'); 

  }

  //Agrego imagenes
  async selectImage(clasificacionFoto:string) 
  {
    this.clasificacion = clasificacionFoto;
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
 
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
   //FUNCIONES PARA LOGRAR DIRECTORIOS PATH
   createFileName() {
    var d = new Date(),
        dia = d.getDate(),
        mes = d.getMonth()+1,
        año = d.getFullYear(),
        // n = d.getTime(),,
        // newFileName = this.clasificacion + n + ".jpg";
        newFileName = this.clasificacion + "."+ dia + mes + año + ".jpg";
    return newFileName;
    }
    copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast('Error while storing file.');
      });
    }

    updateStoredImages(name) {
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          if (!arr) {
              let newImages = [name];
              this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
          } else {
              arr.push(name);
              this.storage.set(STORAGE_KEY, JSON.stringify(arr));
          }
   
          let filePath = this.file.dataDirectory + name;
          let resPath = this.pathForImage(filePath);
   
          let newEntry = {
              name: name,
              path: resPath,
              filePath: filePath
              // clasif: 'HCCLASIF'
          };
   
          // this.images = [newEntry, ...this.images];
          // console.log("IMAGENES DEL UPLOAD: ", this.images);
          // localStorage.setItem('imagenes', JSON.stringify(this.images));
          // console.log("LocalStorage de subida GET: ", localStorage.getItem('imagenes'));
          // this.ref.detectChanges(); // trigger change detection cycle
      });
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
