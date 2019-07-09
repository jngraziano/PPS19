import { Component, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {


  idiomaSeleccionado = "ES";


  constructor(private nativeAudio: NativeAudio, 
              public router: Router){

                //NUMEROS            
      //ES
      this.nativeAudio.preloadSimple('uno', 'assets/sounds/uno.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('dos', 'assets/sounds/dos.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('tres', 'assets/sounds/tres.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('cuatro', 'assets/sounds/cuatro.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('cinco', 'assets/sounds/cinco.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
       //EN
      this.nativeAudio.preloadSimple('one', 'assets/sounds/one.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('two', 'assets/sounds/two.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('three', 'assets/sounds/three.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('four', 'assets/sounds/four.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('five', 'assets/sounds/five.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      
              }

  
  mainM(){
    this.router.navigateByUrl('/tab1'); 

  }

  playUno(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('uno').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('one').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playDos(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('dos').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('two').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playTres(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('tres').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('three').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playCuatro(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('cuatro').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('four').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playCinco(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('cinco').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('five').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }



}
