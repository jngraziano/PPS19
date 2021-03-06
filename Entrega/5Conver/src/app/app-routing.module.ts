import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  { path: '', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},

  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },

  { path: '', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },

  { path: '', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },

  { path: '', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },

  { path: '', loadChildren: './tabinicial/tabinicial.module#TabinicialPageModule' },
  { path: 'tabinicial', loadChildren: './tabinicial/tabinicial.module#TabinicialPageModule' }

  

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
