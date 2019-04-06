import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  //Originales
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' }

  //nuevas:
  { path: '', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
