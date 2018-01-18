import { Component } from '@angular/core';

/**
 * Generated class for the ToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html'
})
export class ToolbarComponent {

  text: string;

  constructor() {
    console.log('Hello ToolbarComponent Component');
    this.text = 'Hello World';
  }

}
