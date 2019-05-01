import { Component, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";

import { Router } from "@angular/router";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(public toastController: ToastController, 
              public router: Router){}

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
  mainM(){
    this.router.navigateByUrl('/tab1'); 

  }
}
