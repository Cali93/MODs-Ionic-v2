import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login'; 

// import { Scene } from '../scene';

/**
 * Generated class for the LeftMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'left-menu',
  templateUrl: 'left-menu.html'
})
export class LeftMenuComponent {

  isActive = true;

  constructor(public modalCtrl: ModalController, 
                public navCtrl: NavController,
                  public navParams: NavParams) {

  }

  activeButton() {
    this.isActive = !this.isActive;
  }

  logInOrSignIn() {
    if (this.isLoggedIn()) {
      this.navCtrl.parent.select(2);
    }
    else {
      this.navCtrl.push(LoginPage);
    }

  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') ? true : false;
  }


  // addMod(){
    // var loader = new THREE.ObjectLoader();
    // loader.load( // load a resource
    //   '../assets/MODs.json', // resource URL
    //   function ( obj ) { // onCompleted callback
    //     editor.execute( new AddObjectCommand( obj ) );
    //   },
    //   function ( xhr ) { // onProgress callback
    //     // console.log();
    //   },
    //   function( err ) { // onError callback
    //     console.log( 'An error happened' );
    //   }
    // );
  
  // }
}
