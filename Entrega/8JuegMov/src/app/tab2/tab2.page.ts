import { Component, OnInit } from '@angular/core';

// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
// import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActionSheetController,
         LoadingController, 
         ToastController   } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit  {

  personaje:any;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute){

      this.activatedRoute.queryParams.subscribe((res)=>{
        this.personaje = res;
        // alert(this.personaje.personaje);
    });
    }



  ngOnInit(){

  }


  seleccionoPersonaje(personaje: string){
    // this.router.navigateByUrl('/tab2');
    
    this.router.navigate(['/tab2', personaje]);

  }





}
