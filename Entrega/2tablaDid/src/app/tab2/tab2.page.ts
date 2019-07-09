import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  idiomaSeleccionado = "ES";

  constructor(private nativeAudio: NativeAudio, 
              public router: Router){
            
    //ANIMALES            
      //ES
      this.nativeAudio.preloadSimple('perro', 'assets/sounds/perro.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('gato', 'assets/sounds/gato.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('pajaro', 'assets/sounds/pajaro.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('conejo', 'assets/sounds/conejo.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('mono', 'assets/sounds/mono.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
    
       //EN
      this.nativeAudio.preloadSimple('dog', 'assets/sounds/dog.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('cat', 'assets/sounds/cat.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('bird', 'assets/sounds/bird.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('rabbit', 'assets/sounds/rabbit.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      this.nativeAudio.preloadSimple('monkey', 'assets/sounds/monkey.mp3').then((success)=>{console.log("success");},(error)=>{console.log(error);});
      
 
 
    }


  mainM(){
    this.router.navigateByUrl('/tab1'); 

  }

  playPerro(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('perro').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('dog').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
  playGato(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('gato').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('cat').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
 
  playPajaro(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('pajaro').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('bird').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
  
  playConejo(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('conejo').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('rabbit').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }

  playMono(){
    if (this.idiomaSeleccionado == 'ES') {this.nativeAudio.play('mono').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
    else if (this.idiomaSeleccionado == 'US') {this.nativeAudio.play('monkey').then((success)=>{console.log("success playing");},(error)=>{console.log(error);});}
  }
  

}
