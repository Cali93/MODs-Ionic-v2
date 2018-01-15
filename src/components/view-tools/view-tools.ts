import { Component } from '@angular/core';

/**
 * Generated class for the ViewToolsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'view-tools',
  templateUrl: 'view-tools.html'
})
export class ViewToolsComponent {

  text: string;

  constructor() {
    console.log('Hello ViewToolsComponent Component');
    this.text = 'Hello World';
  }

}
