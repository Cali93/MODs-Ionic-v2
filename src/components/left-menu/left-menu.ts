import { Component } from '@angular/core';
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

  constructor() {}

  activeButton() {
    this.isActive = !this.isActive;
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
