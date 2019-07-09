import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  idiomaSeleccionado = "ES";


  constructor(private nativeAudio: NativeAudio, 
    public router: Router){

        //COLORES            
      //ES
      this.nativeAudio.preloadSimple('rojo', 'assets/sounds/rojo.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('azul', 'assets/sounds/azul.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('amarillo', 'assets/sounds/amarillo.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('naranja', 'assets/sounds/naranja.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('verde', 'assets/sounds/verde.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
       //EN
      this.nativeAudio.preloadSimple('red', 'assets/sounds/red.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('blue', 'assets/sounds/blue.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('yellow', 'assets/sounds/yellow.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('orange', 'assets/sounds/orange.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('green', 'assets/sounds/green.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      
 



    }


  mainM(){
    this.router.navigateByUrl('/tab1'); 

  }

  playRojo(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('rojo').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('red').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}

  }

  playAzul(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('azul').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('blue').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playAmarillo(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('amarillo').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('yellow').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playNaranja(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('naranja').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('orange').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }

  playVerde(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('verde').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('green').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
 
  }





  
}
