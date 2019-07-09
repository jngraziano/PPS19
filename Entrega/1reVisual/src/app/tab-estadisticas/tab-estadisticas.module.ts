import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEstadisticasPage } from './tab-estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: TabEstadisticasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabEstadisticasPage]
})
export class TabEstadisticasPageModule {}
