import { Component } from '@angular/core';

/**
 * Generated class for the RightMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'right-menu',
  templateUrl: 'right-menu.html'
})
export class RightMenuComponent {

  text: string;

  constructor() {
    console.log('Hello RightMenuComponent Component');
    this.text = 'Hello World';
  }

}
