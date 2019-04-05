import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
