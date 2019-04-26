import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( 
              public router: Router,
              public toastController: ToastController){}


              
              async logoff(){


                const toast = await this.toastController.create({
                  message: 'Sesion Finalizada.',
                  color: 'light',
                  showCloseButton: false,
                  position: 'top',
                  closeButtonText: 'Done',
                  duration: 2000 
                });
            
                toast.present();
            
                this.router.navigateByUrl('/login'); 
            
              }

              animalB(){
                this.router.navigateByUrl('/tab2'); 
              }

              
              colorsB(){
                this.router.navigateByUrl('/tab3'); 
            
              }
              numbersB(){
                this.router.navigateByUrl('/tab4'); 
            
              }

              
}
