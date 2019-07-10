import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-tabinicial',
  templateUrl: './tabinicial.page.html',
  styleUrls: ['./tabinicial.page.scss'],
})
export class TabinicialPage {

  constructor(
              public router: Router,
              public toastController: ToastController
  ) { }

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



  cursoA(){
    this.router.navigateByUrl('/tab1'); 
  }
  cursoB(){
    this.router.navigateByUrl('/tab2'); 
  }
  


  
  // colorsB(){
  //   this.router.navigateByUrl('/tab3'); 

  // }
  // numbersB(){
  //   this.router.navigateByUrl('/tab4'); 

  // }

}
