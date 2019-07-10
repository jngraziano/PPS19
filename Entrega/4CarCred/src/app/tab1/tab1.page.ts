import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { FirebaseService } from "../services/firebase.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import * as firebase from "firebase";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  saldoPantalla: number;

  datosEscaneados: any;
  parsedDatosEscaneados: any;
  cargaCreditoBase: any;
  cargaAux: number;
  cargaTotal:number;


  constructor(public toastController: ToastController, 
              public router: Router,
              private scanner: BarcodeScanner,
              private baseService: FirebaseService){

                this.levantarCreditoDB();

              }

              escaneoQR() {
              let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
     

                this.scanner.scan().then((data) => {
                  this.datosEscaneados = data;

                  this.baseService.getItems('cargaCredito').then(cargas => {

                    if(this.datosEscaneados.text == "8c95def646b6127282ed50454b73240300dccabc")
                    {
                      this.cargaAux = 10;

                    }
                    if(this.datosEscaneados.text == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172")
                    {
                      this.cargaAux = 50;
                    }
                    if(this.datosEscaneados.text == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
                    {
                      this.cargaAux = 100;
                    }
                 
                    // let tieneCredito = cargas.find(client => client.usuario == usuarioLogueado.correo);                  
                    this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);
                    
                    if(this.cargaCreditoBase == undefined)
                    {


                      let objetoEnviar = {
                        "codigo": this.datosEscaneados.text,
                        "usuario": usuarioLogueado.correo,
                        "carga": this.cargaAux,
                        "cargaTotal": this.cargaAux
          
                      }
    
                      this.baseService.addItem('cargaCredito', objetoEnviar);

                      this.levantarCreditoDB();

                      this.creoToast(true);

                    }
                    else{
                      // if(this.cargaCreditoBase.codigo != this.datosEscaneados.text)
                      if(cargas.find(client =>client.codigo == this.datosEscaneados.text) == undefined)

                      {
                        this.cargaTotal = parseInt(this.cargaCreditoBase.cargaTotal) + this.cargaAux;

                        let objetoEnviarOtraCarga = {
                          "codigo": this.datosEscaneados.text,
                          "usuario": usuarioLogueado.correo,
                          "carga": this.cargaAux,
                          "cargaTotal": this.cargaTotal
            
                        }
                        let objetoEnviar = {
                         
                          "cargaTotal": this.cargaTotal
            
                        }
                        this.baseService.addItem('cargaCredito', objetoEnviarOtraCarga);  
                        this.baseService.updateItem('cargaCredito', this.cargaCreditoBase.key, objetoEnviar);  
  
  
                        this.levantarCreditoDB();
  
                      this.creoToast(true);
                    
  
                        
                      }
                      else{
                      this.creoToast(false);
                 
                      }
                    }


                 
                    // this.key = this.pedidoCliente.key;
                   
                    // this.preciototalAnterior = this.pedidoCliente.preciototal;
                  
                    // this.totalFinal = this.pedidoCliente.preciototal + this.propina;
                  
                    // this.muestroAlert();
              
                  });

                  // if(this.datosEscaneados.text == "8c95def646b6127282ed50454b73240300dccabc")
                  // {
                  //   alert("codigo ya escaneado");
                  // }

                 

                
                 
            
                }, (err) => {
                  console.log("Error: " + err);
                });
              }




              levantarCreditoDB(){
                this.baseService.getItems('cargaCredito').then(cargas => {
                  let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
                  this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);

                  if(this.cargaCreditoBase == undefined)
                  {
                    this.saldoPantalla = 0.00;
                  }
                  else{
                    this.saldoPantalla = parseInt(this.cargaCreditoBase.cargaTotal);
                  }

                  
                  });
              }     

              borroQR(){
                this.baseService.getItems('cargaCredito').then(cargas => {
                  let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('Usuarios'));
                  this.cargaCreditoBase = cargas.find(client => client.usuario == usuarioLogueado.correo);

               
                  this.baseService.removeItem('cargaCredito', this.cargaCreditoBase.key );
                  this.levantarCreditoDB();
                  });

                 

              }

              async creoToast(rta: boolean) {

                if(rta == true)
                {
                  const toast = await this.toastController.create({
                    message: 'Se acredito el credito correspondiente.',
                    color: 'success',
                    showCloseButton: false,
                    position: 'top',
                    duration: 2000 
                  });
              
                  toast.present();
            
            
                }
                else{
                  const toast = await this.toastController.create({
                    message: 'Error, QR ya utilizado',
                    color: 'danger',
                    showCloseButton: false,
                    position: 'top',
                    duration: 2000 
                  });
              
                  toast.present();
            
                }
              }
}
