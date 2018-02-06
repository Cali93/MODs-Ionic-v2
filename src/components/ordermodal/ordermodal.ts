import { Component, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ordermodal',
  templateUrl: 'ordermodal.html',
  encapsulation: ViewEncapsulation.None
})
export class OrdermodalComponent {

  text: string;

  constructor(private modalService: NgbModal) {
    console.log('Hello OrdermodalComponent Component');
    this.text = 'Hello World';
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  onOrder(){
    console.log('second function is op');
  }
}
