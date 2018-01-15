import { Component } from '@angular/core';

/**
 * Generated class for the SidebarEditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-edit',
  templateUrl: 'sidebar-edit.html'
})
export class SidebarEditComponent {

  text: string;

  constructor() {
    console.log('Hello SidebarEditComponent Component');
    this.text = 'Hello World';
  }

}
