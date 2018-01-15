import { Component } from '@angular/core';

/**
 * Generated class for the ProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  text: string;

  constructor() {
    console.log('Hello ProductsComponent Component');
    this.text = 'Hello World';
  }

}
