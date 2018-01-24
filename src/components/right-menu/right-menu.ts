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

  isActive = true;

  constructor() {}

  activeButton() {
    this.isActive = !this.isActive;
  }
}
