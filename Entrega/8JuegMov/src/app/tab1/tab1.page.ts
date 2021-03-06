import { Component, OnInit } from '@angular/core';

// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
// import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActionSheetController,
         LoadingController, 
         ToastController   } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

 
  constructor(private router: Router){}



  ngOnInit(){

  }


  seleccionoPersonaje(personaje: string){

    // let objectEnviar = {
    //   personaje: personaje
    //   }

    switch (personaje) {
      case "ironman":
      this.router.navigateByUrl('/tab2');
          break;
          case "captainamerica":
              this.router.navigateByUrl('/tab4');          
              break;
              case "spiderman":
                  this.router.navigateByUrl('/tab5');      
                  break;
                  case "wolverine":
                      this.router.navigateByUrl('/tab6');          
                      break;
                      case "thor":
                          this.router.navigateByUrl('/tab7');          
                          break;
      
    
      default:
        break;
    }
  }
  
    // this.router.navigateByUrl('/tab2');
    
  //   this.router.navigate(['/tab2'], {
  //     queryParams: objectEnviar ,
  //     });

  // }
}
