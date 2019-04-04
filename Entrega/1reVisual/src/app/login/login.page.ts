import { Component, OnInit } from '@angular/core';
// import { IonicPage, NavController, MenuController } from 'ionic-angular';
// import {UserProvider} from "../../providers/user/user";
// import {HttpProvider} from "../../providers/http/http";
// import {User} from "../../models/user";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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


  constructor() { }

  ngOnInit() {
  }

}
