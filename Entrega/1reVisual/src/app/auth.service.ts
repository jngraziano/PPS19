import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth :  AngularFireAuth) { }

  // Login de usuario
 loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err)) 
}
}
