import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

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
  mainM(){
    this.router.navigateByUrl('/tab1'); 

  }
}
