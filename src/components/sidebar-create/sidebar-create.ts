import { Component } from '@angular/core';

/**
 * Generated class for the SidebarCreateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-create',
  templateUrl: 'sidebar-create.html'
})
export class SidebarCreateComponent {

  text: string;

  constructor() {
    console.log('Hello SidebarCreateComponent Component');
    this.text = 'Hello World';
  }

}
