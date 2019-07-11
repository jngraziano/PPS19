import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public usuario: any;
  public inputText: string;
  // public esClienteConPedido: boolean = false;
  // public esDeliveryBoy: boolean = false;
  chats: { texto: string, usuario: string, destino: string, hora: string }[] = [];
  public chatListoEntrega: any[] = [];
  // public cliente: string = "";

  constructor( private baseService: FirebaseService,
    public toastController: ToastController, 
               public router: Router){}

  mainM(){
    this.router.navigateByUrl('/tabinicial'); 
  }


  traerChats() {
    this.baseService.getItems('chat').then(chat => {
      // if (this.esClienteConPedido) {
        this.chats = chat.filter(ch => ch.aula == "PPS-4A" );
    
      // } else {
      //   if (this.cliente != "") {
      //     this.chats = chat.filter(ch => 
      //       (ch.usuario == 'delivery@gmail.com' && ch.destino == this.cliente)
      //       || (ch.usuario == this.cliente && ch.destino == 'delivery@gmail.com'));
        // }
      // }

    });
  }

  // inicializarChats() {
  //   this.baseService.getItems('chat').then(chats => {
  //     chats.forEach(cha => {
  //       if (cha.estado == 'listoEntrega') {
  //         this.chatListoEntrega.push(cha.cliente);
  //       }
  //     });

  //     this.usuario = JSON.parse(sessionStorage.getItem('Usuarios'));
  //     // this.esDeliveryBoy = this.usuario.perfil == 'delivery';

  //     let hayPedido: boolean = false;
  //     if (chats.find(pedido => pedido.cliente == this.usuario.correo && pedido.estado == 'listoEntrega')) {
  //       hayPedido = chats.filter(pedido => pedido.cliente == this.usuario.correo && pedido.estado == 'listoEntrega').length > 0;
  //     }
  //     this.esClienteConPedido = this.usuario.perfil == 'cliente' && hayPedido;

  //     if (this.esClienteConPedido) {
  //       this.traerChats();
  //     }
  //     console.log(this.chatListoEntrega);
  //   });
  // }


  doSend() {
  let usuarioLogeado = JSON.parse(sessionStorage.getItem('Usuarios'));

    let hora_fecha = (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString();
    let chat: any;
    // if (this.esClienteConPedido) {
      chat = {
        texto: this.inputText,
        usuario: usuarioLogeado.correo,
        // destino: 'delivery@gmail.com',
        aula: "PPS-4B",
        hora: hora_fecha
      };
    // } else {
      // chat = {
      //   texto: this.inputText,
      //   usuario: this.usuario.correo,
      //   destino: this.cliente,
      //   hora: hora_fecha
      // };
    // }

    this.baseService.addItem('chat', chat);
    this.inputText = "";
    this.traerChats();
  }

}
