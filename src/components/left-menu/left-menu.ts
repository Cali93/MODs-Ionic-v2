import { Component } from '@angular/core';

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
}
