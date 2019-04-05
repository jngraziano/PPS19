import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController: AlertController, public router: Router){}

  async logoff(){


    const alert = await this.alertController.create({
      header: 'Salida.',
      subHeader: '',
      message: 'Sesion cerrada.',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigateByUrl('/login'); 

  }
}
