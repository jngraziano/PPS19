import { Component, OnInit } from '@angular/core';

// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
// import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActionSheetController,
         LoadingController, 
         ToastController   } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { MenuController} from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';


declare let Phaser;

let that;
let game;
let player;
let aliens;
let bullets;
let bulletTime = 0;
let cursors;
let mobileCursors ={
  left: false,
  right: false,
  up: false,
  down: false
};
let fireButton;
let mobileFireButton = false;
let explosions;
let starfield;
let score = 0;
let scoreString = '';
let scoreText;
let lives;
let enemyBullets;
let firingTimer = 0;
let stateText;
let livingEnemies = [];

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  personaje:any;
  rutaMarvel: string;

  public estadoTexto = false ; 
  public reinicioText: any; 
  public reinicio: boolean;

  public xOrient:any;
  public yOrient:any;
  public zOrient:any;
  public timestamp:any;
  public accX:any;
  public accY:any;
  public accZ:any;

  public activar: boolean = true;
  public subscription;
  public estado;

  slideOpts = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1
    // autoplay:true
  };



  constructor(private menuCtrl: MenuController,
    private router: Router,
    private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion,
    private activatedRoute: ActivatedRoute) {
      
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'space-invaders',
    { preload: this.preload, create: this.create, update: this.update,  render: this.render });

  that = Object.create(this.constructor.prototype);
  this.Accelerometer();

     }

     ionViewDidEnter() {
      this.menuCtrl.enable(false, 'start');
      this.menuCtrl.enable(false, 'end');
    }

    ngOnInit(){
      // this.activoGiroscopio();
      this.Accelerometer();
  
    }
  
    activoGiroscopio() {
  
  
      let options: GyroscopeOptions = {
        frequency: 700
      };
  
      this.gyroscope.getCurrent(options)
    .then((orientation: GyroscopeOrientation) => {
       console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
     })
    .catch();
  
      this.gyroscope.watch()
     .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.accX=orientation.x;
        this.accY=orientation.y;
        this.accZ=orientation.z;
        //VERTICAL
        if( this.accX >= 9 ) {
          //  console.log("Está parado"); 
           this.estado="PARADO";
         
          //  setTimeout(function() {this.luzFlash.switchOff();}, 3000);
  
        that.arribaStart();
       
          }
  
        // HORIZONTAL
        else if ( this.accZ >= 9) { 
  
          // console.log("Está horizontal"); 
          this.estado="ACOSTADO";
              
          that.abajoStart();
        }
     
        //IZQ
        else if ( this.accY >= 9) { 
          // console.log("Está de costado IZQ"); 
          this.estado="IZQUIERDA";
          that.leftStart();
        }
   
        //DER
        else if ( this.accY <= -9) {
          //  console.log("Está de costado DER"); 
           this.estado="DERECHA";
           that.rightStart();
          }
  
        //RESTO
        else {
          // console.log("-----Registro de Watch------ ");
      
        
        }
     });
    }
  
  
  
  
  
    Accelerometer(){
      this.activar = false;
      var flag = true;
      // var flagIzq =  true;
      // var flagDer = true;
  
      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) =>
         console.log(acceleration),
     
      //  (error: any) => console.log(error)
   
      );
  
      
  
      this.subscription = this.deviceMotion.watchAcceleration({frequency:1000}).subscribe((acceleration: DeviceMotionAccelerationData) => {
        // console.log("esta es el watch: ",acceleration);
        this.accX=acceleration.x;
        this.accY=acceleration.y;
        this.accZ=acceleration.z;
        let tap;
  
  
        //VERTICAL
        if( this.accY >= 9 ) {
          //  console.log("Está parado"); 
           this.estado="PARADO";
         
          //  setTimeout(function() {this.luzFlash.switchOff();}, 3000);
  
        that.arribaStart();
       
          }
  
        // HORIZONTAL
        else if ( this.accZ >= 9) { 
  
          // console.log("Está horizontal"); 
          this.estado="ACOSTADO";
              
          that.abajoStart();
        }
     
        //IZQ
        else if ( this.accX >= 9) { 
          // console.log("Está de costado IZQ"); 
          this.estado="IZQUIERDA";
          that.leftStart();
        }
   
        //DER
        else if ( this.accX <= -9) {
          //  console.log("Está de costado DER"); 
           this.estado="DERECHA";
           that.rightStart();
          }
  
        //RESTO
        else {
          // console.log("-----Registro de Watch------ ");
      
        
        }
      });
    }
  
     preload() {
      // game.load.image('bullet', 'assets/phaser/bullet.png');
      // game.load.image('enemyBullet', 'assets/phaser/enemy-bullet.png');
      game.load.spritesheet('invader', 'assets/phaser/invader32x32x4.png', 32, 32);
      game.load.image('ship', 'assets/icon/captainamerica_fly.png');
      
      game.load.spritesheet('kaboom', 'assets/phaser/explode.png', 128, 128);
      game.load.image('starfield', 'assets/icon/build1.jpg');
      game.load.image('background', 'assets/phaser/background2.png');
  
    }
  
  
  
    async create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
  
      //  The scrolling starfield background
      starfield = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');
  
      //  The hero!
      player = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'ship');
      player.anchor.setTo(0.5, 0.5);
      game.physics.enable(player, Phaser.Physics.ARCADE);
  
      player.body.collideWorldBounds = true;
      
      
  
      //  The score
      scoreString = 'Record : ';
      scoreText = game.add.text(10, 10, scoreString + score, { font: '24px Arial', fill: '#fff' });
      let usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
  
      localStorage.setItem("puntaje",scoreText);
      localStorage.setItem("correo",usuarioLogueado.Correo);
  
  
      // await this.baseService.getItems('tablaKinetico').then(async score => {
      //   let tablaScore = score;
      //   let puntajeUsuario = tablaScore.filter(imagen => imagen.correo == usuarioLogueado.correo);
      //   let objetoEnviar = {
      //     puntaje: scoreText,
      //     correo: usuarioLogueado.Correo
      //   }
      //   if(puntajeUsuario == undefined)
      //   {
      //   this.baseService.addItem('tablaKinetico', objetoEnviar);  
  
        
  
      //   }
      //   else{
      //     this.baseService.updateItem('tablaKinetico', puntajeUsuario.key, objetoEnviar);  
  
      //   }
        
  
      // });  
     
  
      //  Lives
      lives = game.add.group();
      // game.add.text(game.world.width - 100, 10, 'Vidas : ', { font: '24px Arial', fill: '#fff' });
  
      //  Text
      stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '34px Arial', fill: '#fff' });
      stateText.anchor.setTo(0.5, 0.5);
      stateText.visible = false;
      
  
      // for (let i = 0; i < 3; i++) {
      //   let ship = lives.create(game.world.width - 100 + (30 * i), 60, 'invader');
      //   ship.anchor.setTo(0.5, 0.5);
      //   // ship.angle = 90;
      //   ship.alpha = 0.4;
      // }
  
      cursors = game.input.keyboard.createCursorKeys();
      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
    }
  
  
    restart() {
  
      //  A new level starts
  
      // resets the life count
      lives.callAll('revive');
      //  And brings the aliens back from the dead :)
      // aliens.removeAll();
      // that.createAliens();
  
      // revives the player
      player.revive();
      // hides the text
      // this.presentAlertJuegoFinalizado();
      score = 0 ;
      scoreText.text = scoreString + score;
      
      let timerReinicio = 5;
  
  
      setTimeout(() => {
        
        stateText.visible = false;
      this.estadoTexto = false;
      }, 6000);
  
      setTimeout(() => {
      this.create();
      }, 2000);
    }
  
  
  
    update() {
      //  Scroll the background
      starfield.tilePosition.y += 2;
      // if (player.alive) {
        //  Reset the player, then check for movement keys
        // player.body.velocity.setTo(0, 0);
        score += 1;
        scoreText.text = scoreString + score;
       console.log(player.getBounds());
  
        if (cursors.left.isDown || mobileCursors.left) {
          // player.body.velocity.x = -200;
          // player.body.velocity.setTo(-1000, 0);
          
          player.body.velocity.x -= 50 ;
          // player.body.bounce.set(1);
          player.body.onWorldBounds = new Phaser.Signal();
          mobileCursors.left = false;
  
        } else if (cursors.right.isDown || mobileCursors.right) {
          // player.body.velocity.x = 200;
          // player.body.velocity.setTo(1000, 0);
          
          player.body.velocity.x += 50 ;
  
          // player.body.bounce.set(1);
          player.body.onWorldBounds = new Phaser.Signal();
          mobileCursors.right = false;
        } else if ( mobileCursors.up) {
          // player.body.velocity.setTo(0, -1000);
          
          player.body.velocity.y -= 50 ;
          // player.body.bounce.set(1);
          player.body.onWorldBounds = new Phaser.Signal();
          mobileCursors.up = false;
  
        } else if (mobileCursors.down) {
          // player.body.velocity.setTo(0, 1000);
          
          player.body.velocity.y += 50 ;
          // player.body.bounce.set(1);
          player.body.onWorldBounds = new Phaser.Signal();
          mobileCursors.down = false;
        }
  
        // console.log("window height", window.innerHeight);
        // console.log("window widht", window.innerWidth);
  
        let varY = player.getBounds().y - (window.innerHeight - 158) ;
        // console.log("varY", varY);
        let varX = player.getBounds().x - (window.innerWidth - 158) ;
        // console.log("varX", varX);
  
        // if (player.body.velocity.y === 0 || player.body.velocity.x === 0 ) {
          if (  player.getBounds().y == 0  ||  (varY >= 0 && varY < 3 )  ) {
  
          console.log("Choco Arriba o abajo");
          player.body.velocity.setTo(0, 0);
          // game.restart();
          this.estadoTexto = true;
          stateText.text = " Perdiste \n";
  
              stateText.visible = true;
            //  that.restart();
              // the "click to restart" handler
              // game.input.onTap.addOnce(that.restart, {x: 1});
              
  
         } else if (player.getBounds().x == 0 ||  (varX >= 0 && varX < 3 )   ) {
          console.log("Choco Costado");
          player.body.velocity.setTo(0, 0);
          // game.restart();
            this.estadoTexto = true;
          stateText.text = " Perdiste \n";
              stateText.visible = true;
            //  that.restart();
         } else {
           console.log("esta en otro lado");
         }
  
    }
  
    render() {
      // for (let i = 0; i < aliens.length; i++)
      // {
      //     game.debug.body(aliens.children[i]);
      // }
    }
  
    
    collisionHandler() {
      //  When a bullet hits an alien we kill them both
      console.log("colision con bordes");
  
    }
  
   vuelvoLogin(){
    this.router.navigateByUrl('/login');
   }
  
    fireBullet() {
      //  To avoid them being allowed to fire too fast we set a time limit
      if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        let bullet = bullets.getFirstExists(false);
  
        if (bullet) {
          //  And fire it
          bullet.reset(player.x, player.y + 8);
          bullet.body.velocity.y = -400;
          bulletTime = game.time.now + 200;
        }
      }
  
    }
  
    resetBullet(bullet) {
  
      //  Called if the bullet goes out of the screen
      bullet.kill();
  
    }
  
  
    fireStart(event){
      mobileFireButton = true
    }
    fireEnd(event){
      mobileFireButton = false;
    }
    leftStart(){
      mobileCursors.left = true;
    }
    arribaStart(){
      mobileCursors.up = true;
    }
    abajoStart(){
      mobileCursors.down = true;
    }
    rightStart() {
      mobileCursors.right = true;
    }
  
    leftEnd(event){
      mobileCursors.left = false;
    }
  
    rightEnd(event){
      mobileCursors.right = false;
    }
  

}
