import { Component, OnInit } from '@angular/core';
// import { IonicPage, NavController, MenuController } from 'ionic-angular';
// import {UserProvider} from "../../providers/user/user";
// import {HttpProvider} from "../../providers/http/http";
// import {User} from "../../models/user";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [FirebaseAuthentication],
})
export class LoginPage implements OnInit {
   // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account = {
    username: 'usuario',
    fullname: 'Carlos ',
    email: 'yajuve.25.dz@gmail.com',
    password: 'demodemo'
  };

  // Our translated text strings
  private loginErrorString: string;
  private opt: string = 'signin';


  constructor(private firebaseAuthentication: FirebaseAuthentication) { }

  ngOnInit() {
  }

  onClickLogin(event)
  {
   alert("estoy aca");
   
  }
  onClick() {
    // this.firebaseAuthentication.createUserWithEmailAndPassword('jngraziano@gmail.com', 'prueba')
    // .then((res: any) => console.log(res))
    // .catch((error: any) => console.error(error));
   this.firebaseAuthentication.onAuthStateChanged()
   this.firebaseAuthentication.signInWithEmailAndPassword("jngraziano@gmail.com","prueba").catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });


  

  }
  

}
