import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor( 
              public router: Router,
              public toastController: ToastController){}

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

}
