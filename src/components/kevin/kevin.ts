import { Component } from '@angular/core';

/**
 * Generated class for the KevinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kevin',
  templateUrl: 'kevin.html'
})
export class KevinComponent {

  text: string;

  constructor() {
    console.log('Hello KevinComponent Component');
    this.text = 'Hello Kevin';
  }

}
