import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public alertController: AlertController, 
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

}
